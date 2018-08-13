/**
 * Author: alex
 * CreateDate: Mon Aug 13 2018 19:27:16
 * PageName: xtgg-1
 * Alias: 系统公告
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {ActionReportBasic} from '../actions-basic';

export class ActionReportXtgg1 extends ActionReportBasic {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.state, {
      customeState: []
    });

    const {dateRange} = this.conditionOptionsMapper;
    this.conditionOptions = [
      dateRange,
    ];

    let keyFields = [
      'UserName',
      'BetAmount',
      'NetAmount',
      'Profit',
    ];

    this.keyMapper = [
      ...this.getFields({
        names: keyFields,
      })
    ];
  }
  queryData(formHelper) {
    console.log(formHelper);
    // let sendData = {
    //   method: this.apis.SOME_API,
    //   formHelperRef: formHelper,
    //   onSuccess: res => {
    //     console.log(res);
    //   }
    // };
    // this.onRequest({sendData});
  }
}
