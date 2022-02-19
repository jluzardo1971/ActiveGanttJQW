var ActiveGanttJQWCtl1;

$(document).ready(function () {

    $('#oActiveGantt').ActiveGanttJQWCtl();
    ActiveGanttJQWCtl1 = $('#oActiveGantt').ActiveGanttJQWCtl("GetControl");
    window.addEventListener('resize', mp_WindowResize, true);

    var oDS = new clsCarRentalDataSource();

    mp_WindowResize();

});

function mp_WindowResize() {
    $('#oActiveGantt').height(window.innerHeight - 60);
    $('#oActiveGantt').ActiveGanttJQWCtl("Resize");
}


////Data Structures


dr_CR_Rows = function () {
    this.lRowID;
    this.lDepth;
    this.lOrder;
    this.sLicensePlates;
    this.lCarTypeID;
    this.sNotes;
    this.cRate;
    this.sACRISSCode;
    this.sCity;
    this.sBranchName;
    this.sState;
    this.sPhone;
    this.sManagerName;
    this.sManagerMobile;
    this.sAddress;
    this.sZIP;
}

dr_CR_Rentals = function () {
    this.lTaskID;
    this.lRowID;
    this.lMode;
    this.sCustomerName;
    this.sAddress;
    this.sCity;
    this.sStateAbr;
    this.sZIP;
    this.sPhone;
    this.sMobile;
    this.dtPickUp;
    this.dtReturn;
    this.cRate;
    this.cALI;
    this.cCRF;
    this.cERF;
    this.cGPS;
    this.cLDW;
    this.cPAI;
    this.cPEP;
    this.cRCFC;
    this.cVLF;
    this.cWTB;
    this.cTax;
    this.cEstimatedTotal;
    this.bGPS;
    this.bFSO;
    this.bLDW;
    this.bPAI;
    this.bPEP;
    this.bALI;
}

dr_CR_Car_Types = function () {

    this.lCarTypeID;
    this.sDescription;
    this.sACRISSCode;
    this.cStdRate;
}

dr_CR_US_States = function () {
    this.sStateAbr;
    this.sStateFullName;
    this.cCarRentalTax;
}

dr_CR_ACRISS_Codes = function () {
    this.lID;
    this.sLetter;
    this.sDescription;
    this.lPosition;
}

dr_CR_Taxes_Surcharges_Options = function () {
    this.sID;
    this.sDescription;
    this.cRate;
}

dr_US_Cities = function () {
    this.lID;
    this.sCityName;
    this.sStateAbr;
}

dr_Last_Names = function () {
    this.lID;
    this.sLastName;
}

dr_CR_FirstNames = function () {
    this.lID;
    this.sFirstName;
    this.sSex;
}

dr_CR_US_Streets = function () {
    this.lID;
    this.sStreetSuffix;
    this.sStreetSuffixAbr;
}

clsCarRentalDataSource = function () {
    this.tb_CR_ACRISS_Codes = [];
    this.tb_CR_ACRISS_Codes1 = [];
    this.tb_CR_ACRISS_Codes2 = [];
    this.tb_CR_ACRISS_Codes3 = [];
    this.tb_CR_ACRISS_Codes4 = [];
    this.tb_CR_Car_Types = [];
    this.tb_CR_Rentals = [];
    this.tb_CR_Rows = [];
    this.tb_CR_Taxes_Surcharges_Options = [];
    this.tb_CR_US_States = [];
    this.tb_CR_FirstNames = [];
    this.tb_Last_Names = [];
    this.tb_US_Cities = [];
    this.tb_US_Streets = [];
    this.NoDataSource_Add_First_Names();
    this.NoDataSource_Add_US_Cities();
    this.NoDataSource_Add_Last_Names();
    this.NoDataSource_Add_US_Streets();
    this.NoDataSource_Load_Car_Types();
    this.NoDataSource_Load_US_States();
    this.NoDataSource_Load_ACRISS_Codes(this.tb_CR_ACRISS_Codes, 0);
    this.NoDataSource_Load_ACRISS_Codes(this.tb_CR_ACRISS_Codes1, 1);
    this.NoDataSource_Load_ACRISS_Codes(this.tb_CR_ACRISS_Codes2, 2);
    this.NoDataSource_Load_ACRISS_Codes(this.tb_CR_ACRISS_Codes3, 3);
    this.NoDataSource_Load_ACRISS_Codes(this.tb_CR_ACRISS_Codes4, 4);
    this.NoDataSource_Load_Taxes_Surcharges_Options();
    this.NoDataSorce_Load_Rows();
    this.NoDataSorce_Load_Rentals();
}

clsCarRentalDataSource.prototype.NoDataSource_Add_First_Names = function () {
}

clsCarRentalDataSource.prototype.NoDataSource_Add_US_Cities = function () {
}

clsCarRentalDataSource.prototype.NoDataSource_Add_Last_Names = function () {
}

clsCarRentalDataSource.prototype.NoDataSource_Add_US_Streets = function () {
}

clsCarRentalDataSource.prototype.NoDataSource_Load_Car_Types = function () {
}

clsCarRentalDataSource.prototype.NoDataSource_Load_US_States = function () {
}

clsCarRentalDataSource.prototype.NoDataSource_Load_ACRISS_Codes = function () {
}

clsCarRentalDataSource.prototype.NoDataSource_Load_Taxes_Surcharges_Options = function () {
}

clsCarRentalDataSource.prototype.NoDataSorce_Load_Rows = function () {
    this.NoDataSorce_Load_Row(28, 0, 1, "", 0, "", 0.0, "", "Hillsboro Beach", "Hillsboro Beach", "FL", "(175) 157-9697", "Nancy Mcatee", "(175) 554-7615", "113 Bueno Drive", "22454");
    this.NoDataSorce_Load_Row(29, 1, 2, "CKT-2542", 39, "", 245.0, "FFBV", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(30, 1, 3, "XXW-9757", 14, "", 37.0, "EDAZ", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(31, 1, 4, "HGO-6751", 16, "", 37.0, "EDAZ", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(32, 1, 5, "QIZ-1491", 17, "", 37.0, "ECAZ", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(33, 1, 6, "WGN-3159", 46, "", 77.0, "LCAR", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(34, 1, 8, "TJS-5515", 37, "", 245.0, "FFBV", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(35, 1, 9, "FPN-9487", 31, "", 37.0, "CDMV", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(36, 1, 10, "ENU-2926", 26, "", 45.0, "FWAV", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(37, 1, 11, "MND-5686", 11, "", 39.0, "IDAV", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(38, 1, 12, "ZZY-1567", 18, "", 37.0, "ECAZ", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(39, 0, 13, "", 0, "", 0.0, "", "Woodville", "Woodville", "OK", "(145) 548-2974", "Matthew Risner", "(145) 679-8583", "8 Navarro Junction", "61614");
    this.NoDataSorce_Load_Row(40, 1, 14, "SGL-3748", 24, "", 37.0, "CDAV", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(41, 1, 15, "VYW-1478", 43, "", 51.0, "FVAV", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(42, 1, 16, "LXV-4412", 27, "", 45.0, "FWAV", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(44, 1, 7, "IMU-3364", 23, "", 37.0, "CDAV", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(45, 1, 17, "FRG-8842", 30, "", 37.0, "CDMV", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(46, 1, 18, "OJQ-8553", 14, "", 37.0, "EDAZ", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(47, 1, 19, "INT-3737", 5, "", 223.0, "PWDV", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(48, 1, 20, "USM-8758", 47, "", 77.0, "LCAR", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(49, 1, 21, "RRL-2724", 32, "", 37.0, "CDMV", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(50, 1, 22, "EMF-3865", 20, "", 37.0, "CDAV", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(51, 1, 23, "SRC-5911", 32, "", 37.0, "CDMV", "", "", "", "", "", "", "", "");
    this.NoDataSorce_Load_Row(52, 1, 24, "VTN-9768", 3, "", 71.0, "IFBV", "", "", "", "", "", "", "", "");
}

clsCarRentalDataSource.prototype.NoDataSorce_Load_Row = function (lRowID, lDepth, lOrder, sLicensePlates, lCarTypeID, sNotes, cRate, sACRISSCode, sCity, sBranchName, sState, sPhone, sManagerName, sManagerMobile, sAddress, sZIP) {
}

clsCarRentalDataSource.prototype.NoDataSorce_Load_Rentals = function () {
}

