export interface IAct {
  actNo: string
  actYear: string
  dateSigned: string
  longTitleEn: string
  longTitleGa: string
  shortTitleEn: string
  shortTitleGa: string
  statutebookURI: string
  uri: string
}

export interface IFormat {
  pdf: { uri: string } | null
  xml: { uri: string } | null
}

export interface IChamber {
  showAs: string
  uri: string
  chamberCode?: string
}

export interface IHouse {
  chamberCode: string
  chamberType: string
  houseCode: string
  houseNo: string
  showAs: string
  uri: string
}

export interface IEvent {
  chamber: IChamber | null
  dates: { date: string }[]
  showAs: string
  uri: string
}

export interface IStageEvent extends IEvent {
  house: IHouse | null
  progressStage: number
  stageCompleted: boolean
  stageOutcome: string | null
  stageURI: string
}

export interface IAmendment {
  amendmentTypeUri: { uri: string }
  chamber: IChamber
  date: string
  formats: IFormat
  showAs: string
  stage: { showAs: string; uri: string }
  stageNo: string
}

export interface IDebate {
  chamber: IChamber
  date: string
  debateSectionId: string
  showAs: string
  uri: string
}

export interface IRelatedDoc {
  date: string
  docType: string
  formats: IFormat
  lang: string
  showAs: string
  uri: string
}

export interface IVersion {
  date: string
  docType: string
  formats: IFormat
  lang: string
  showAs: string
  uri: string
}

export interface ISponsor {
  as: { showAs: string; uri: string | null }
  by: { showAs: string | null; uri: string | null }
  isPrimary: boolean
}

export type BillStatus = 'Current' | 'Withdrawn' | 'Enacted' | 'Rejected' | 'Defeated' | 'Lapsed'

export interface IOireachtasBill {
  act: IAct
  amendmentLists: { amendmentList: IAmendment }[]
  billNo: string
  billType: string
  billTypeURI: string
  billYear: string
  debates: IDebate[]
  events: { event: IEvent }[]
  lastUpdated: string
  longTitleEn: string
  longTitleGa: string
  method: string
  methodURI: string
  mostRecentStage: { event: IStageEvent }
  originHouse: { showAs: string; uri: string }
  originHouseURI: string
  relatedDocs: { relatedDoc: IRelatedDoc }[]
  shortTitleEn: string
  shortTitleGa: string
  source: string
  sourceURI: string
  sponsors: { sponsor: ISponsor }[]
  stages: { event: IStageEvent }[]
  status: BillStatus
  statusURI: string
  uri: string
  versions: { version: IVersion }[]
}

export type IMappedBill = Pick<IOireachtasBill, 'billNo' | 'billType' | 'status' | 'longTitleEn' | 'longTitleGa'> & {
  id: string
  sponsor: string
}
export interface IBillsParams {
  skip: number
  limit: number
}

export interface IBillsResponse {
  head: {
    counts: {
      resultCount: number
      billCount: number
    }
  }
  results: {
    bill: IOireachtasBill
  }[]
}
