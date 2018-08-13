/**
 * Author: alex
 * CreateDate: Mon Aug 13 2018 17:34:36
 * PageName: xtgg
 * Alias: 系统公告
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {ActionReportBasic} from '../actions-basic';

export class ActionReportXtgg extends ActionReportBasic {
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
