import * as React from 'react';
import styles from './ReactCrud.module.scss';
import { IReactCrudProps } from './IReactCrudProps';
import { IReactCrudState } from './IReactCrudState';
import {SPOperations} from '../../Services/SPServices';
import {Button, Dropdown, IDropdownOption, TextField} from "office-ui-fabric-react";
import { escape } from '@microsoft/sp-lodash-subset';


export default class ReactCrud extends React.Component<IReactCrudProps, IReactCrudState, {}> {
  
  public _spOps : SPOperations; //declare type
  public selectedListTitle: string;
  public listItemTitleVal: string;
  public listItemID: number;

  constructor(props:IReactCrudProps){
    super(props);
    this._spOps = new SPOperations();
    this.state = {listTitles : [], status: ""};
  }

  public componentDidMount(){
    this._spOps.GetAllList(this.props.context).then((result:IDropdownOption[])=>{
      this.setState({listTitles: result});
    })
  }

  public getListTitle = (event:any, data:any)=>{
    console.log("dpd data", data);
    this.selectedListTitle = data.text;
  }

  public getListItemTitleVal = (event:any, data:any) =>{
    console.log("text data", data);
    this.listItemTitleVal = data;
  }

  public getListItemID = (event:any, data:any) =>{
    this.listItemID = parseInt(data);
  }
  
  public render(): React.ReactElement<IReactCrudProps> {

    //let option: IDropdownOption[] = [];

    return (
      <div className={ styles.reactCrud }>

        <p>{escape(this.props.description)}</p>
        <p>{escape(this.props["Percent Completed"])}</p>
        <p>{escape(this.props.ListUrl)}</p>

        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SPFx CRUD!</span>
              <p className={ styles.subTitle }>Demo CRUD, Fabric</p>
              <div id="dv_Parent">
                  <p>Display all list titles in the dropdown</p>
                  <Dropdown 
                      options={this.state.listTitles}
                      placeholder="***Select your List***"
                      onChange={this.getListTitle}
                  ></Dropdown>
                  
                  <TextField className={styles.marginT20} onChange={this.getListItemTitleVal} placeholder="Type in the Title for the list item"></TextField>
                  <Button text="Create List Item" onClick={()=>
                    this._spOps
                      .CreateListItem(this.props.context, this.selectedListTitle, this.listItemTitleVal).then((result:string)=>{
                        this.setState({status: result})
                      })
                    }
                  ></Button>
                  
                  <TextField onChange={this.getListItemID} className={styles.marginT20} placeholder="Type in the ID for the item to be deleted"></TextField>
                  <Button text="Delete List Item" onClick={()=> 
                    this._spOps
                      .DeleteListItem(this.props.context, this.selectedListTitle, this.listItemID).then((result:string)=>{
                        this.setState({status: result})
                      })
                    }
                  ></Button>

                  <Button text="Update List Item" onClick={()=>
                    this._spOps
                      .UpdateListItem(this.props.context, this.selectedListTitle, this.listItemTitleVal, this.listItemID).then((result:string)=>{
                        this.setState({status: result})
                      })
                    }
                  ></Button>

                  <div>{this.state.status}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
