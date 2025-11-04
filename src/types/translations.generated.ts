// AUTO-GENERATED - DO NOT EDIT
// Generated: 2025-11-04T13:41:46.955Z
// Run 'pnpm generate:types' to regenerate

export type RTLTranslations = {
  homePage: {
    title: string;
    subtitle: string;
    viewDemo: string;
  };
  aboutPage: {
    title: string;
    subtitle: string;
    learnMore: string;
  };
  navBar: {
    home: string;
    dashboard: string;
    parties: string;
    asset: string;
    news: string;
    subscribe: string;
  };
  heroSection: {
    heading: string;
    news: string;
    dashboard: string;
    politicalTime: string;
  };
  heroSectionCards: {
    newsCardTitle: string;
    dashboardCardTitle: string;
    politicalTimeCardTitle: string;
    buttonName1: string;
    buttonName2: string;
    buttonName3: string;
  };
  reformNewsSection: {
    sectionTitle: string;
    imageTitle: string;
    rightSideTitle: string;
    viewAllNews: string;
    cardTitle: string;
    cardDescription: string;
    person: string;
    date: string;
    buttonText: string;
  };
  reformUpdateSection: {
    sectionTitle: string;
    viewAll: string;
    buttonTitle: string;
    seeRecentUpdates: string;
    corruptionAgainst: string;
  };
  newsletter: {
    title: string;
    description: string;
    emailPlaceholder: string;
    subscribeButton: string;
  };
  footer: {
    rightsReserved: string;
    navigation: string;
    dashboard: string;
    politicalParties: string;
    assets: string;
    news: string;
    email: string;
    phone: string;
    address: string;
    contactUs: string;
    contactUsAndFindLatestNews: string;
  };
  resource: {
    title: string;
    description: string;
    searchBarPlaceHolder: string;
    sector: string;
    date: string;
    file: string;
    category: string;
    publishedDate: string;
    commission: string;
    size: string;
    fileName: string;
    categoryName: string;
    dummyDate: string;
    commissionEx: string;
    sizeOfFile: string;
  };
  reformNews: {
    title: string;
    descriptionOfTitle: string;
    searchBarPlaceHolder: string;
    sector: string;
    writer: string;
    time: string;
    cardTitle: string;
    cardDescription: string;
    writerName: string;
    publishedDate: string;
    seeRecentNews: string;
    reformUpdateTitle: string;
    reformUpdateDescription: string;
    seeRecentUpdate: string;
    corruptionAgainst: string;
    navigationDescription: string;
  };
  parties: {
    title: string;
    description: string;
    totalStatement: string;
    BNP: string;
    rejected: string;
    secondTitle: string;
    searchBarPlaceHolder: string;
    sector: string;
    writer: string;
    time: string;
    proposalName: string;
    commission: string;
    category: string;
    NCP: string;
    Jamat: string;
    educationReformLaw: string;
    commissionEx: string;
    logisession: string;
    support: string;
    against: string;
    thirdTitle: string;
    graphTitle: string;
    acceptance: string;
    rejectance: string;
    date: string;
  };
  dashboard: {
    title: string;
    totalProposal: string;
    totalCommission: string;
    reformUsingSector: string;
    antiCorruption: string;
    graphTitle: string;
    running: string;
    completed: string;
    preplanned: string;
    expelled: string;
  };
};

export type DemoTranslations = {
  pageTitle: string;
  pageSubtitle: string;
  backToHome: string;
  colorPalette: {
    title: string;
    subtitle: string;
    colors: {
      primary: string;
      primary400: string;
      primary200: string;
      primary100: string;
      primary50: string;
      neutral900: string;
      neutral800: string;
      neutral700: string;
      neutral600: string;
      neutral500: string;
      neutral400: string;
      neutral300: string;
      neutral200: string;
      neutral100: string;
      neutral0: string;
      secondary: string;
      secondary300: string;
      secondary200: string;
      secondary100: string;
      success: string;
      success80: string;
      success50: string;
      success10: string;
      warning: string;
      warning300: string;
      warning50: string;
      purple: string;
      purple300: string;
      purple100: string;
      lime: string;
      lime300: string;
      lime100: string;
    };
  };
  languageCard: {
    title: string;
    currentLanguage: string;
    english: string;
    bengali: string;
  };
  appState: {
    title: string;
    sidebar: string;
    search: string;
    open: string;
    closed: string;
    toggleSidebar: string;
    toggleSearch: string;
  };
  examples: {
    title: string;
    buttons: {
      title: string;
      primary: string;
      secondary: string;
      success: string;
    };
    formatting: {
      title: string;
      date: string;
      number: string;
    };
    translations: {
      title: string;
    };
  };
};

export interface TranslationPages {
  homePage: RTLTranslations["homePage"];
  aboutPage: RTLTranslations["aboutPage"];
  navBar: RTLTranslations["navBar"];
  heroSection: RTLTranslations["heroSection"];
  heroSectionCards: RTLTranslations["heroSectionCards"];
  reformNewsSection: RTLTranslations["reformNewsSection"];
  reformUpdateSection: RTLTranslations["reformUpdateSection"];
  newsletter: RTLTranslations["newsletter"];
  footer: RTLTranslations["footer"];
  resource: RTLTranslations["resource"];
  reformNews: RTLTranslations["reformNews"];
  parties: RTLTranslations["parties"];
  dashboard: RTLTranslations["dashboard"];
  demo: DemoTranslations;
}

export type PageKey = keyof TranslationPages;

export type GetPageTranslation<T extends PageKey> = TranslationPages[T];
