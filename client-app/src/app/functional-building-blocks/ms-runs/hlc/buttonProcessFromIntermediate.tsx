import React, { FunctionComponent } from 'react';
import { IntermediateSample } from '../../../types';
import { ButtonProcessFromIntermediateBulk } from './buttonProcessFromIntermediateBulk';

type PropsSingle = {
    sample: IntermediateSample;
    title: string;
    style?: React.CSSProperties | undefined;
};

export const ButtonProcessFromIntermediate: FunctionComponent<PropsSingle> = ({ sample, style, title }) => {
    return <ButtonProcessFromIntermediateBulk samples={[sample]} style={style} title={title} />;
};
