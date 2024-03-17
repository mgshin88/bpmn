import { xml2json, json2xml } from 'xml-js';
import _ from 'lodash';
import { ProcessList } from "@common/interfaces";

export const xmlToJson = (xml: string) => {
  return JSON.parse(xml2json(xml, { compact: true, spaces: 4 }));
}

export const jsonToXml = (json: any) => {
  return json2xml(JSON.stringify(json), { compact: true, spaces: 4 });
}

export const generateXMLFromJson = (processList: ProcessList[]) => {
  const processJson = generateJson(processList);
  return jsonToXml(processJson);
};

export const generateXML = (processList: ProcessList[]) => {
  let xml = `<?xml version='1.0' encoding='UTF-8'?>
  <bpmn:definitions xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:bpmn='http://www.omg.org/spec/BPMN/20100524/MODEL' xmlns:bpmndi='http://www.omg.org/spec/BPMN/20100524/DI' xmlns:dc='http://www.omg.org/spec/DD/20100524/DC' xmlns:di='http://www.omg.org/spec/DD/20100524/DI' id='Definitions_1' targetNamespace='http://bpmn.io/schema/bpmn'>
    <bpmn:process id='Process_1' isExecutable='false'>
      <bpmn:startEvent id='StartEvent_1'>
        <bpmn:outgoing>Flow_0</bpmn:outgoing>
      </bpmn:startEvent>`;

  processList.forEach((process: any, i: number) => {
    xml += `
      <bpmn:task id='Activity_${process.uid}' name='${process.appName}'>
        <bpmn:incoming>Flow_${i}</bpmn:incoming>
        <bpmn:outgoing>Flow_${i + 1}</bpmn:outgoing>
        ${i !== processList.length - 1 ? `<bpmn:outgoing>Flow_${i + 1}</bpmn:outgoing>` : null}
      <bpmn:sequenceFlow id='Flow_${i}' sourceRef='Activity_${i === 0 ? 'StartEvent_1' : processList[i - 1].uid}' targetRef='Activity_${process.uid}' />`;
  });

  xml += `
    </bpmn:process>
    <bpmndi:BPMNDiagram id='BPMNDiagram_1'>
      <bpmndi:BPMNPlane id='BPMNPlane_1' bpmnElement='Process_1'>`;

  // StartEvent 위치
  xml += `
        <bpmndi:BPMNShape id='StartEvent_1_di' bpmnElement='StartEvent_1'>
          <dc:Bounds x='173' y='102' width='36' height='36'/>
        </bpmndi:BPMNShape>`;

  let x = 100, y = 80, flowY = 120; // 시작 위치

  // 시퀀스 플로우 및 그 외 다이어그램 요소 위치 설정 가능
  processList.forEach((process: ProcessList, i) => {
    // Task 위치
    xml += `
        <bpmndi:BPMNShape id='Activity_${process.uid}_di' bpmnElement='Activity_${process.uid}'>
          <dc:Bounds x='${x += 160}' y='${y}' width='100' height='80'/>
        </bpmndi:BPMNShape>`;

    xml += `
        <bpmndi:BPMNEdge id='Flow_${i}_di' bpmnElement='Flow_${i}'>
        <di:waypoint x='${i === 0 ? 209 : x - 60}' y='${flowY}'/>
        <di:waypoint x='${x}' y='${flowY}'/>
        </bpmndi:BPMNShape>`;
  });

  xml += `
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </bpmn:definitions>`;

  return xml.replace(/\n/g, '').replace(/\t/g, '').replace(/\\/g, '');
}

export const generateJson = (processList: ProcessList[]) => {
  let processJson = {
    _declaration: {
      _attributes: {
        version: '1.0',
        encoding: 'UTF-8'
      }
    },
    'bpmn:definitions': {
      _attributes: {
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xmlns:bpmn': 'http://www.omg.org/spec/BPMN/20100524/MODEL',
        'xmlns:bpmndi': 'http://www.omg.org/spec/BPMN/20100524/DI',
        'xmlns:dc': 'http://www.omg.org/spec/DD/20100524/DC',
        'xmlns:di': 'http://www.omg.org/spec/DD/20100524/DI',
        id: 'Definitions_1',
        targetNamespace: 'http://bpmn.io/schema/bpmn'
      },
      'bpmn:process': {
        _attributes: {
          id: 'Process_1',
          isExecutable: 'false'
        },
        'bpmn:startEvent': {
          _attributes: {
            id: 'StartEvent_1'
          },
          'bpmn:outgoing': {
            _text: 'Flow_0'
          }
        },
        'bpmn:task': [] as any[],
        'bpmn:sequenceFlow': [] as any[]
      },
      'bpmndi:BPMNDiagram': {
        _attributes: {
          id: 'BPMNDiagram_1'
        },
        'bpmndi:BPMNPlane': {
          _attributes: {
            id: 'BPMNPlane_1',
            bpmnElement: 'Process_1'
          },
          'bpmndi:BPMNShape': [{
            _attributes: {
              id: '_BPMNShape_StartEvent_2',
              bpmnElement: 'StartEvent_1',
            },
            'dc:Bounds': {
              _attributes: {
                x: '173',
                y: '102',
                width: '36',
                height: '36'
              }
            }
          }],
          'bpmndi:BPMNEdge': [] as any[]
        }
      }
    }
  };

  let shapeX = 100, shapeY = '80', flowY = '120';

  processList.forEach((process: any, i) => {
    const taskObject = {
      _attributes: {
        id: `Activity_${process.uid}`,
        name: process.appName
      }
    };
    processJson['bpmn:definitions']['bpmn:process']['bpmn:task'].push(taskObject);

    processJson['bpmn:definitions']['bpmndi:BPMNDiagram']['bpmndi:BPMNPlane']['bpmndi:BPMNShape'].push({
      _attributes: {
        id: `Activity_${process.uid}_di`,
        bpmnElement: `Activity_${process.uid}`,
      },
      'dc:Bounds': {
        _attributes: {
          x: String(shapeX += 160),
          y: shapeY,
          width: String(100),
          height: String(80)
        }
      }
    });
  });

  return processJson;
};

export const compareObjectLists = (list1: [], list2: []) => {
  if (list1.length !== list2.length) {
    return false;
  }
  // 정렬이 필요한 경우, 정렬 로직을 추가.
  // 예: list1.sort((a, b) => a.id - b.id);
  //     list2.sort((a, b) => a.id - b.id);
  for (let i = 0; i < list1.length; i++) {
    if (!_.isEqual(list1[i], list2[i])) {
      return false;
    }
  }
  return true;
}

export const compareObjects = (obj1: any, obj2: any) => {
  const isObject = (object: any) => object != null && typeof object === 'object';

  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !compareObjects(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

export const compareObjectsFromXml = (newDoc: string, existDoc: string) => {
  const newObj = xmlToJson(newDoc);
  const existObj = xmlToJson(existDoc);
  
  return compareObjects(newObj, existObj);
}