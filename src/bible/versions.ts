enum Versions {
    AMP= "AMP",
    NIV = "NIV",
    ESV = "ESV",
    KJV = "KJV",
    NKJV = "NKJV",
    ASV = "ASV",
    BSB = "BSB",
    NASB = "NASB",
    DBT = "DBT",
    DRB = "DRB",
    ERV = "ERV",
    YLT = "YLT",
    NLT = "NLT",
    EASY = "EASY",
    CSB = "CSB",
}

export type Version = keyof typeof Versions;
export default Versions;