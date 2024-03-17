import React from 'react';
import { createRoot } from 'react-dom/client';
import '@styles/index.css'
// import App from './App';
import { RecoilRoot } from 'recoil';
import { BpmnLoader } from 'bpmn-concplay';

const container = document.getElementById('app');
const root = createRoot(container);

const tenant = {
    code: '1000',
    name: 'tenant1'
}

root.render(
    <RecoilRoot>
        <React.Suspense fallback={<div>Loading...</div>}>
            <BpmnLoader tenant={tenant} />
        </React.Suspense>
    </RecoilRoot>
);