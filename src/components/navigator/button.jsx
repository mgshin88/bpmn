import React from "react";
import styled from "styled-components";
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { processListState } from '@recoils/process/list/atom';
import { errorType, successType } from '@common/enums';
import { saveProcessSelector } from '@recoils/selectors';

const theme = {
    blue: {
        default: "#3f51b5",
        hover: "#283593",
    },
    pink: {
        default: "#e91e63",
        hover: "#ad1457",
    },
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  border: 0; 
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
    theme: "blue",
};

export default function SaveButton(props) {
    const processList = useRecoilValue(processListState);

    const onClickHandler = useRecoilCallback(({ snapshot }) => async () => {
        if (processList && processList.length > 0) {

            try {
                const response = await snapshot.getPromise(saveProcessSelector(processList));

                if (response.success) {
                    alert(successType.SAVE_SUCCESS);

                } else {
                    alert(errorType.API_ERROR);
                }

            } catch (error) {
                console.error(error);
                alert(errorType.ERROR_OCCURRED, error);
            }
        } else {
            alert(errorType.NON_EXIST);
        };
    });

    return (
        <div style={{ display: 'flex' }}>
            <Button onClick={onClickHandler}>Styled Button</Button>
        </div>
    )
}