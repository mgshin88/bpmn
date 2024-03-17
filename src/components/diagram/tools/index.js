import CustomPalette from '@components/diagram/tools/modules/palette';
import CustomContextPad from '@components/diagram/tools/modules/contextPad';
import CustomRenderer from '@components/diagram/tools/modules/renderer';
import CustomDirectEditing from '@components/diagram/tools/modules/editor';
import CustomCommandInterceptor from '@components/diagram/tools/modules/interceptor';
import CustomRule from '@components/diagram/tools/modules/rule';
import CustomModelingAction from '@components/diagram/tools/modules/modeling';

export default function CustomModule(programList, processList, onSetParameters) {

    function CustomContextPadInstance(bpmnFactory, config, contextPad, create, elementFactory, injector, translate) {
        return new CustomContextPad(bpmnFactory, config, contextPad, create, elementFactory, injector, translate, programList, onSetParameters);
    }

    function CustomPaletteInstance(bpmnFactory, config, create, elementFactory, injector, palette, translate) {
        return new CustomPalette(bpmnFactory, config, create, elementFactory, injector, palette, translate, programList);
    }

    function CustomRendererInstance(eventBus, bpmnRenderer) {
        return new CustomRenderer(eventBus, bpmnRenderer, processList);
    }

    function CustomCommandInterceptorInstance(eventBus, modeling, elementFactory, elementRegistry) {
        return new CustomCommandInterceptor(eventBus, modeling, elementFactory, elementRegistry, onSetParameters, processList);
    }
    
    function CustomModelingActionInstance(modeling, bpmnFactory, elementFactory, elementRegistry, canvas) {
        return CustomModelingAction(modeling, bpmnFactory, elementFactory, elementRegistry, canvas, processList);
    }

    return {
        __init__: [
            'customContextPad',
            'customPalette',
            'customRenderer',
            'customDirectEditing',
            'customCommandInterceptor',
            'customRule',
            'customModelingActions'
        ],
        customContextPad: ['type', CustomContextPadInstance],
        customPalette: ['type', CustomPaletteInstance],
        customRenderer: ['type', CustomRendererInstance],
        customCommandInterceptor: ['type', CustomCommandInterceptorInstance],
        customDirectEditing: ['type', CustomDirectEditing],
        customRule: ['type', CustomRule],
        customModelingActions: ['type', CustomModelingActionInstance],
    }
};