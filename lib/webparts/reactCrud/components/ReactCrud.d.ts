import * as React from 'react';
import { IReactCrudProps } from './IReactCrudProps';
import { IReactCrudState } from './IReactCrudState';
import { SPOperations } from '../../Services/SPServices';
export default class ReactCrud extends React.Component<IReactCrudProps, IReactCrudState, {}> {
    _spOps: SPOperations;
    selectedListTitle: string;
    listItemTitleVal: string;
    listItemID: number;
    constructor(props: IReactCrudProps);
    componentDidMount(): void;
    getListTitle: (event: any, data: any) => void;
    getListItemTitleVal: (event: any, data: any) => void;
    getListItemID: (event: any, data: any) => void;
    render(): React.ReactElement<IReactCrudProps>;
}
//# sourceMappingURL=ReactCrud.d.ts.map