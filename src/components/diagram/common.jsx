import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import BpmnModuler from 'bpmn-js/lib/Modeler';
import CustomModule from '@components/diagram/tools';
import { processFlowType } from '@common/enums';
import { jsonToXml, generateJson, compareObjectsFromXml } from '@common/functions';
import {
  processFlowState,
  processListState,
  newProgramListState
} from '@recoils/states';

const CommonBpmn = ({ onSetParameters, onShown, onLoading, onError }) => {
  const containerRef = useRef(null);
  const [localDiagramXML, setLocalDiagramXML] = useState('');
  const bpmnModulerRef = useRef(null);
  const processList = useRecoilValue(processListState);
  const processFlow = useRecoilValue(processFlowState);
  const programList = useRecoilValue(newProgramListState);

  useEffect(() => {
    const container = containerRef.current;
    const customModule = CustomModule(programList, processList, onSetParameters);

    bpmnModulerRef.current = new BpmnModuler({
      container: container,
      additionalModules: [customModule],
      height: '100%',
      width: '100%'
    });

    bpmnModulerRef.current.on('import.done', ({ error, warnings }) => {
      if (error) {
        onError?.(error);
        return;
      }

      bpmnModulerRef.current.get('canvas').zoom('fit-viewport');
      onShown?.(warnings);
    });

    bpmnModulerRef.current.on('commandStack.changed', function () {
      bpmnModulerRef.current.saveXML({ format: true }).then(function (result) {
        if (!compareObjectsFromXml(result.xml, localDiagramXML)) {
          console.log('save xml');
          setLocalDiagramXML(result.xml);
        }
      });
    });

    async function onSetDiagram() {
      if (processFlow === processFlowType.new && programList.length > 0) {
        setLocalDiagramXML('');
        await createDiagram();
      } else if (processFlow === processFlowType.continue && localDiagramXML) {
        console.log('xml');
        await displayDiagram(localDiagramXML);
      } else if (processFlow === processFlowType.load && programList.length === 0) {
        await loadDiagram();
      }
    }

    onSetDiagram();
    return () => {
      console.log('destory');
      // if (bpmnModulerRef.current.get('canvas')._rootElement) {
      bpmnModulerRef.current.destroy();
      // }
    };
  }, [programList, localDiagramXML]);


  // useEffect(() => {
  //   async function onSetDisplayXml() {
  //     if (processFlow === processFlowType.continue && localDiagramXML) {
  //       console.log('xml');
  //       await displayDiagram(localDiagramXML);
  //     }
  //   }
  //   onSetDisplayXml();
  // }, [localDiagramXML]);


  const loadDiagram = async () => {
    if (processList.length > 0) {
      const model = generateJson(processList);
      const modelXml = jsonToXml(model);
      console.log('model', modelXml);
      await displayDiagram(modelXml);
      // connectEvent();
    }
  };

  const displayDiagram = async (xml) => {
    await bpmnModulerRef.current.importXML(xml).then(() => {
      if (programList.length === 0) {
        connectEvent();
        addEndEvent();
      }
    }).catch(onError);
  };

  const createDiagram = async () => {
    try {
      await bpmnModulerRef.current.createDiagram();
    } catch (error) {
      onError(error);
    }
  };

  const connectEvent = () => {
    const modeling = bpmnModulerRef.current.get('modeling');
    const elementRegistry = bpmnModulerRef.current.get('elementRegistry');
    let previousElement = elementRegistry.get('StartEvent_1');

    elementRegistry.forEach(element => {
      if (previousElement && element.type === 'bpmn:Task') {
        if (element.incoming.length > 0 || element.outgoing.length > 0) {
          return;
        }
        modeling.connect(previousElement, element);
        previousElement = element;
      }
    });
  };

  const addEndEvent = () => {
    const modeling = bpmnModulerRef.current.get('modeling');
    const elementRegistry = bpmnModulerRef.current.get('elementRegistry');
    const elementFactory = bpmnModulerRef.current.get('elementFactory');


    const endEvent = elementRegistry.find(element => {
      return element.type === 'bpmn:EndEvent';
    });

    if (!endEvent) {
      const tasks = elementRegistry.filter(element => {
        return element.type === 'bpmn:Task';
      });

      if (tasks.length > 0) {
        const lastTask = tasks[tasks.length - 1];
        const position = {
          x: lastTask.x + 170, // 마지막 태스크로부터 오른쪽으로 150 떨어진 위치
          y: 120
        };

        const endEventShape = elementFactory.createShape({ type: 'bpmn:EndEvent' });
        modeling.createShape(endEventShape, position, lastTask.parent);
        modeling.connect(lastTask, endEventShape);
      }
    }

  };

  return <div className='react-bpmn-diagram-container' ref={containerRef}></div>;
};

export default CommonBpmn;