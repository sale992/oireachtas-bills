export interface IBillsParams {
  skip: number
  limit: number
}

export interface IOireachtasBill {
  act: {
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
  amendmentLists: {
    amendmentList: {
      amendmentTypeUri: { uri: string }
      chamber: { showAs: string; uri: string }
      date: string
      formats: {
        pdf: { uri: string } | null
        xml: { uri: string } | null
      }
      showAs: string
      stage: { showAs: string; uri: string }
      stageNo: string
    }
  }[]
  billNo: string
  billType: string
  billTypeURI: string
  billYear: string
  debates: {
    chamber: { showAs: string; uri: string }
    date: string
    debateSectionId: string
    showAs: string
    uri: string
  }[]
  events: {
    event: {
      chamber: { chamberCode: string; showAs: string; uri: string } | null
      dates: { date: string }[]
      eventURI: string
      showAs: string
      uri: string
    }
  }[]
  lastUpdated: string
  longTitleEn: string
  longTitleGa: string
  method: string
  methodURI: string
  mostRecentStage: {
    event: {
      chamber: { chamberCode: string; showAs: string; uri: string } | null
      dates: { date: string }[]
      house: {
        chamberCode: string
        chamberType: string
        houseCode: string
        houseNo: string
        showAs: string
        uri: string
      } | null
      progressStage: number
      showAs: string
      stageCompleted: boolean
      stageOutcome: string | null
      stageURI: string
      uri: string
    }
  }
  originHouse: { showAs: string; uri: string }
  originHouseURI: string
  relatedDocs: {
    relatedDoc: {
      date: string
      docType: string
      formats: {
        pdf: { uri: string } | null
        xml: { uri: string } | null
      }
      lang: string
      showAs: string
      uri: string
    }
  }[]
  shortTitleEn: string
  shortTitleGa: string
  source: string
  sourceURI: string
  sponsors: {
    sponsor: {
      as: { showAs: string; uri: string | null }
      by: { showAs: string | null; uri: string | null }
      isPrimary: boolean
    }
  }[]
  stages: {
    event: {
      chamber: { chamberCode: string; showAs: string; uri: string } | null
      dates: { date: string }[]
      house: {
        chamberCode: string
        chamberType: string
        houseCode: string
        houseNo: string
        showAs: string
        uri: string
      } | null
      progressStage: number
      showAs: string
      stageCompleted: boolean
      stageOutcome: string | null
      stageURI: string
      uri: string
    }
  }[]
  status: string
  statusURI: string
  uri: string
  versions: {
    version: {
      date: string
      docType: string
      formats: {
        pdf: { uri: string } | null
        xml: { uri: string } | null
      }
      lang: string
      showAs: string
      uri: string
    }
  }[]
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

export interface IMappedBill {
  id: string
  billNo: string
  billType: string
  status: string
  sponsor: string
  longTitleEn: string
  longTitleGa: string
}
