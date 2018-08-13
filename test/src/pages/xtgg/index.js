/**
 * Author: alex
 * CreateDate: Mon Aug 13 2018 19:15:20
 * PageName: xtgg
 * Alias: 系统公告
 */

import React, {Component} from 'react';
import {ActionReportXtgg} from '../action-refs';
import {ReportRenderNormal} from '../../components/report-layout-template';

const Xtgg = ReportRenderNormal(ActionReportXtgg);

export {
  Xtgg
}
