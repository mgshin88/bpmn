import '@styles/diagram.css';

export default class CustomPalette {

  constructor(bpmnFactory, config, create, elementFactory, injector, palette, translate, programList) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
    this.programList = programList;
    this.config = config;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', true);
    }

    palette.registerProvider(this);
  }

  getPaletteEntries() {
    const {
      autoPlace,
      bpmnFactory,
      create,
      elementFactory,
      translate,
      programList
    } = this;

    function createTask(suitabilityScore, appName) {
      return function (event) {
        const businessObject = bpmnFactory.create('bpmn:Task');

        businessObject.suitable = suitabilityScore;
        businessObject.text = appName;

        const shape = elementFactory.createShape({
          type: 'bpmn:Task',
          businessObject: businessObject
        });

        create.start(event, shape);
      };
    };


    function appendTask(suitabilityScore, appName) {
      return function (event, element) {
        if (autoPlace) {
          const businessObject = bpmnFactory.create('bpmn:Task');

          businessObject.suitable = suitabilityScore;
          businessObject.text = appName;

          const shape = elementFactory.createShape({
            type: 'bpmn:Task',
            businessObject: businessObject
          });

          autoPlace.append(element, shape);
        }
      };
    }

    return function (entries) {
      console.log('paletteList : ', entries);
      let customEntries = {};

      programList.forEach(program => {
        // 고유 식별자를 사용하여 동적 키 생성
        const dynamicKey = `create.task-${program.uid}`;
        customEntries[dynamicKey] = {
          html: `<div class="entry"> ${program.appName} </div>`,
          group: 'activity',
          // 필요에 따라 program의 속성을 기반으로 다른 className을 설정할 수 있음
          className: 'bpmn-icon-custom-task',
          title: program.appName,
          action: {
            // 예시로 priorities를 사용; 필요에 따라 적절한 매개변수로 변경
            dragstart: createTask(program.score, program.appName),
            click: createTask(program.score, program.appName)
          }
        };
      });

      return customEntries;
    };
  }
}

CustomPalette.$inject = [
  'bpmnFactory',
  'config',
  'create',
  'elementFactory',
  'injector',
  'palette',
  'translate'
];