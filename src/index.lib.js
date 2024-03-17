import React from 'react';
import App from './App';
import { RecoilRoot } from 'recoil';

// Tenant 정보와 기타 필요한 props를 인자로 받는 React 컴포넌트를 만듭니다.
// 이렇게 하면, 라이브러리 사용자가 자신의 Tenant 정보를 전달할 수 있습니다.

export const BpmnLoader = ({ tenant, tab = "home" }) => (
    <RecoilRoot>
        <React.Suspense fallback={<div>Loading...</div>}>
            <App tab={tab} tenant={tenant} />
        </React.Suspense>
    </RecoilRoot>
);
