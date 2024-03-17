import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';

export default class CustomRule extends RuleProvider {
    constructor(eventBus) {
        super(eventBus);

        // this.init();

        this.addRule(['elements.delete'], (context) => {
            const { elements } = context;

            // 특정 요소의 삭제를 방지하는 로직
            if (elements[0].type === 'bpmn:StartEvent') {
                return false;
            };
        });
    }
}

CustomRule.$inject = ['eventBus'];