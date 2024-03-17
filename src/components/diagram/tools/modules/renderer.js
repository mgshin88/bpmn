import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
    append as svgAppend,
    attr as svgAttr,
    classes as svgClasses,
    create as svgCreate
} from 'tiny-svg';

import {
    getRoundRectPath
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import {
    is,
    getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import { isNil } from 'min-dash';

const HIGH_PRIORITY = 1500,
    TASK_BORDER_RADIUS = 2,
    COLOR_GREEN = '#52B415',
    COLOR_YELLOW = '#ffc800',
    COLOR_RED = '#cc0000';


export default class CustomRenderer extends BaseRenderer {
    constructor(eventBus, bpmnRenderer, processList) {
        super(eventBus, HIGH_PRIORITY);

        this.bpmnRenderer = bpmnRenderer;
        this.processList = processList;
    }

    canRender(element) {

        // ignore labels
        return !element.labelTarget && element.businessObject;
    }

    drawShape(parentNode, element) {
        const shape = this.bpmnRenderer.drawShape(parentNode, element);
        const suitabilityScore = this.getSuitabilityScore(element);
        const title = this.getTitle(element);

        if (this.processList.length > 0 && element.type === 'bpmn:Task') {
            // const color = this.getColor(suitabilityScore);

            // const rect = drawRect(parentNode, 100, 30, TASK_BORDER_RADIUS, color);

            // svgAttr(rect, {
            //     transform: 'translate(-50, -15)'
            // });

            const x = element.width / 2;
            const y = element.height / 2;

            var text = svgCreate('text');

            svgAttr(text, {
                fill: '#000',
                transform: `translate(${x}, ${y})`,
                'font-size' : '14',
                'text-anchor': 'middle',
                'dominant-baseline': 'middle',
            });

            const customText = this.processList.filter(process => 
                process.uid === Number(element.id.split("_")[1])
            ).map(process => process.appName);

            if (customText.length > 0) {
                text.textContent = customText[0] || title; 
                svgAppend(parentNode, text);
            }
        // } else {

        }
        return shape;
    }

    getShapePath(shape) {
        if (is(shape, 'bpmn:Task')) {
            return getRoundRectPath(shape, TASK_BORDER_RADIUS);
        }

        return this.bpmnRenderer.getShapePath(shape);
    }

    getSuitabilityScore(element) {
        const businessObject = getBusinessObject(element);
        const { suitable } = businessObject;

        return Number.isFinite(suitable) ? suitable : null;
    }

    getTitle(element) {
        const businessObject = getBusinessObject(element);
        const { text } = businessObject;
        
        return text ? text : null;
    }

    getColor(suitabilityScore) {
        if (suitabilityScore > 75) {
            return COLOR_GREEN;
        } else if (suitabilityScore > 25) {
            return COLOR_YELLOW;
        }

        return COLOR_RED;
    }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer'];

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, color) {
    const rect = svgCreate('rect');

    svgAttr(rect, {
        width: width,
        height: height,
        rx: borderRadius,
        ry: borderRadius,
        stroke: color,
        strokeWidth: 2,
        fill: color
    });

    svgAppend(parentNode, rect);

    return rect;
}