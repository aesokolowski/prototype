import React from 'react';

import { ModeSelectButtonProps } from '../../struct/tttTypes';

const ModeSelectButton: React.FunctionComponent<ModeSelectButtonProps> =
        ({ children, id }) => (
    <div>
       <p>Button {id} will go here</p> 
    </div>
);

export default ModeSelectButton;