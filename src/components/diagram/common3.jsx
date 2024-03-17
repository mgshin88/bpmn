import React, { useEffect, useRef, useState } from 'react';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import BpmnModuler from 'bpmn-js/lib/Modeler';
import CustomModule from '@components/diagram/tools';
import { newProgramListState } from '@recoils/program/new/atom';
import { processState } from '@recoils/process/state/atom';
import { processListState } from '@recoils/process/list/atom';
import { useRecoilValue } from 'recoil';
import { xmlToJson, jsonToXml, generateXMLFromJson } from '@common/functions';

const CommonBpmn = ({ onSetParameters, onShown, onLoading, onError }) => {
  const containerRef = useRef(null);
  const bpmnModulerRef = useRef(null);
  const programList = useRecoilValue(newProgramListState);
  const diagramState = useRecoilValue(processState);
  const processList = useRecoilValue(processListState);

  useEffect(() => {
    const container = containerRef.current;
    const customModule = CustomModule(programList, processList, onSetParameters);

    bpmnModulerRef.current = new BpmnModuler({
      container: container,
      additionalModules: [customModule],
      // keyboard: {
      //   bindTo: window,
      // },
      height: '100%',
      width: '100%'
    });


    if (diagramState === 'NEW' && programList.length > 0) {
      createInitialDiagram();
    } else if (diagramState === 'CTN') {
      // displayDiagram(localDiagramXML);
    };
    
  }, [programList]);


  const createInitialDiagram = () => {
    try {
      bpmnModulerRef.current.createDiagram(); // 빈 다이어그램 생성

      const modeling = bpmnModulerRef.current.get('modeling');
      const elementFactory = bpmnModulerRef.current.get('elementFactory');
      const canvas = bpmnModulerRef.current.get('canvas');

      // 초기 스타트 이벤트 추가
      const startEvent = elementFactory.createShape({ type: 'bpmn:StartEvent' });
      modeling.createShape(startEvent, { x: 173, y: 102 }, canvas.getRootElement());
    } catch (err) {
      console.error('Failed to create initial diagram:', err);
    }
  };

  const addEndEvent = () => {
    const modeling = bpmnModulerRef.current.get('modeling');
    const elementRegistry = bpmnModulerRef.current.get('elementRegistry');

    const tasks = elementRegistry.filter(element => {
      return element.type === 'bpmn:Task';
    });

    if (tasks.length > 0) {
      const lastTask = tasks[tasks.length - 1];
      const position = {
        x: lastTask.x + 150, // 마지막 태스크로부터 오른쪽으로 150 떨어진 위치
        y: lastTask.y
      };

      const endEventShape = elementFactory.createShape({ type: 'bpmn:EndEvent' });
      modeling.createShape(endEventShape, position, lastTask.parent);
    }
  };

  return <div className='react-bpmn-diagram-container' ref={containerRef}></div>;
};

export default CommonBpmn;