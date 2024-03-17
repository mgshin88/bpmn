import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';
import { actionType } from '@common/enums';

export default class CustomCommandInterceptor extends CommandInterceptor {
  constructor(eventBus, modeling, elementFactory, elementRegistry, onSetParameters, processList) {
    super(eventBus);
    this.modeling = modeling;
    this.elementFactory = elementFactory;
    this.elementRegistry = elementRegistry;

    // 'elements.delete' 명령에 대한 사전 실행(pre/post-execute) 로직을 추가합니다.
    this.preExecute(['elements.delete'], ({ context }) => {
      const { elements } = context;
      const elementType = elements[0].type;
    });

    this.postExecute(['elements.delete'], ({ context }) => {
      const { elements } = context;
      const { modeling, elementRegistry } = this;
      const elementType = elements[0].type;

      if (elementType === 'bpmn:Task') {
        const uid = Number(elements[0].id.split("_")[1]);
        // const selectedIndex = processList.findIndex(process => process.uid === uid);
        // let selectedProgram = null

        // if (selectedIndex > 0) {
        //   selectedProgram = processList[selectedIndex - 1];
        // }
        const selectedProgram = processList.find(process => process.uid === uid);
        onSetParameters(selectedProgram, actionType.delete);

        // const endEvent = elementRegistry.filter(element => {
        //   return element.type === 'bpmn:EndEvent';
        // });

        // modeling.removeElements([elements]);
        // if (endEvent && endEvent.length > 0) {
        //   modeling.removeElements([endEvent]);
        // }
      }
    });
  }
}

CustomCommandInterceptor.$inject = ['eventBus', 'modeling'];


// import inherits from 'inherits';
// import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

// export default function CustomCommandInterceptor(eventBus, modeling, onSetParameters) {
//   CommandInterceptor.call(this, eventBus);

//   this.postExecute(['elements.delete'], ({ context }) =>  {
//     const { elements } = context;

//     if (elements[0].type === 'bpmn:StartEvent') {
//       return;
//     }

//     const uid = Number(elements[0].id.split("_")[1]);
//     onSetParameters({ uid: uid });
//   });
// }

// inherits(CustomCommandInterceptor, CommandInterceptor);

// CustomCommandInterceptor.$inject = ['eventBus'];