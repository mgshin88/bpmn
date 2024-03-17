import React from 'react';
import { tenantState } from '@recoils/tenant/atom';
import { useRecoilValue } from 'recoil';

export default function TenantInput() {
    const tenant = useRecoilValue(tenantState);

    return (
        <div style={{ display: 'flex' }}>
            <h2>Tenant</h2>
            <input type='text' value={tenant.code} readOnly></input>
            <input type='text' value={tenant.name} readOnly></input>
        </div>
    )
}