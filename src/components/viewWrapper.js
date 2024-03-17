import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { DiagramViewer, Navigator } from '@components';
import { tenantState } from '@recoils/tenant/atom';

export default function ViewWrapper(props) {
  const [tenant, setTenant] = useRecoilState(tenantState);

  useEffect(() => {
    setTenant(props.tenant);
  }, [props]);

  if (!tenant.code) {
    return null;
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Navigator tenant={tenant.code}/>
      <DiagramViewer />
    </div>
  )
}