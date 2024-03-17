export default function CustomModelingModule(modeling, bpmnFactory, elementFactory, elementRegistry, canvas, processList) {

    function createCustomDiagram() {
        if (processList.length > 0) {
            try {
                // elementRegistry.remove(elementRegistry.get('__implicitroot_0'));

                // 'bpmn:Process'가 존재하는지 확인하고 없으면 생성
                let processElement = elementRegistry.get('Process_1');
                if (!processElement) {
                    const processShape = elementFactory.createParticipantShape({
                        type: 'bpmn:Participant',
                        businessObject: bpmnFactory.create('bpmn:Participant', {
                            id: 'Process_1',
                            processRef: bpmnFactory.create('bpmn:Process', {
                                id: 'Actual_Process_1'
                            })
                        })
                    });
                    modeling.createShape(processShape, { x: 1000, y: 1000 }, canvas.getRootElement());
                    processElement = processShape.businessObject.processRef;
                }

                const startEvent = elementFactory.createShape({
                    type: 'bpmn:StartEvent', businessObject: bpmnFactory.create('bpmn:StartEvent', {
                        id: 'StartEvent_1'
                    })
                });

                modeling.createShape(startEvent, { x: 173, y: 102 }, elementRegistry.get('Process_1'));
                let previousElement = elementRegistry.get('StartEvent_1');

                processList.forEach((process, index) => {
                    const task = elementFactory.createShape({
                        type: 'bpmn:Task', businessObject: bpmnFactory.create('bpmn:Task', {
                            id: `Activity_${process.uid}`,
                            name: process.appName
                        })
                    });
                    modeling.createShape(task, { x: 173 * (index + 2), y: 102 }, elementRegistry.get('Process_1'));

                    if (previousElement) {
                        modeling.connect(previousElement, task);
                    }
                    previousElement = task;
                });

                const endEvent = elementFactory.createShape({
                    type: 'bpmn:EndEvent', businessObject: bpmnFactory.create('bpmn:EndEvent', {
                        id: 'EndEvent_1'
                    })
                });
                modeling.createShape(endEvent, { x: 173 * (processList.length + 2), y: 102 }, elementRegistry.get('Process_1'));
                if (previousElement) {
                    modeling.connect(previousElement, endEvent);
                }
            } catch (error) {
                console.log('Loading Diagram Error Occurred!', error);
            }
        }
    }

    return {
        createCustomDiagram: createCustomDiagram
    };
};