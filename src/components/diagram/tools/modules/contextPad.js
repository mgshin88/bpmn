import '@styles/diagram.css';
import { actionType } from '@common/enums';

export default class CustomContextPad {
    constructor(bpmnFactory, config, contextPad, create, elementFactory, injector, translate, programList, onSetParameters) {
        this.bpmnFactory = bpmnFactory;
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;
        this.programList = programList;
        this.onSetParameters = onSetParameters;

        if (config.autoPlace !== false) {
            this.autoPlace = injector.get('autoPlace', false);
        }

        contextPad.registerProvider(this);
    }

    getContextPadEntries(element) {
        const {
            autoPlace,
            bpmnFactory,
            create,
            elementFactory,
            translate,
            programList,
            onSetParameters
        } = this;

        function appendServiceTask(program) {
            return function (event, element) {
                onSetParameters(program, actionType.add);
                if (element.type === 'bpmn:SequenceFlow') {
                    return null;
                }

                if (autoPlace) {
                    const businessObject = bpmnFactory.create('bpmn:Task');

                    businessObject.suitable = program.score;
                    businessObject.text = program.uid;
                    businessObject.id = `Activity_${program.uid}`;

                    const shape = elementFactory.createShape({
                        type: 'bpmn:Task',
                        businessObject: businessObject
                    });

                    autoPlace.append(element, shape);
                } else {
                    appendServiceTaskStart(event, element);
                }
            };
        }

        function appendServiceTaskStart(suitabilityScore, appName, uid) {
            return function (event) {
                const businessObject = bpmnFactory.create('bpmn:Task');

                businessObject.suitable = suitabilityScore;
                businessObject.text = uid;
                // businessObject.id = uid;

                const shape = elementFactory.createShape({
                    type: 'bpmn:Task',
                    businessObject: businessObject
                });

                create.start(event, shape, element);
            };
        }

        return function (entries) {
            let customEntries = entries;

            delete customEntries['append.append-task'];
            delete customEntries['append.gateway'];
            delete customEntries['append.end-event'];
            delete customEntries['append.intermediate-event'];
            delete customEntries['append.text-annotation'];
            delete customEntries['replace'];

            programList.forEach(program => {
                // 고유 식별자를 사용하여 동적 키 생성
                const dynamicKey = `append.task-${program.uid}`;
                customEntries[dynamicKey] = {
                    html: `<div class="entry"> ${program.appName} </div>`,
                    group: 'model',
                    id: `task-${program.uid}`,
                    // 필요에 따라 program의 속성을 기반으로 다른 className을 설정할 수 있음
                    className: 'bpmn-icon-custom-task',
                    title: program.appName,
                    action: {
                        // 예시로 priorities를 사용; 필요에 따라 적절한 매개변수로 변경
                        dragstart: appendServiceTask(program),
                        click: appendServiceTask(program)
                    }
                };
            });

            return customEntries;
        }

    }
}

CustomContextPad.$inject = [
    'bpmnFactory',
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate'
];