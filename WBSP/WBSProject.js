var ActiveGanttJQWCtl1;
var mp_dtStartDate = new AGJQW.DateTime();
var mp_dtEndDate = new AGJQW.DateTime();
var mp_oFolderClosed = new Image();
var mp_oFolderOpen = new Image();
var mp_oModules = new Image();
var mp_oTask = new Image();
var mp_lImagesLoaded = 0;

var mp_bBluePercentagesVisible = true;
var mp_bGreenPercentagesVisible = true;
var mp_bRedPercentagesVisible = true;

$(document).ready(function () {
    $('#oActiveGantt').ActiveGanttJQWCtl();
    ActiveGanttJQWCtl1 = $('#oActiveGantt').ActiveGanttJQWCtl("GetControl");
    $('#oActiveGantt').ActiveGanttJQWCtl("option", "NodeChecked_callback", ActiveGanttJQWCtl_NodeChecked);
    $('#oActiveGantt').ActiveGanttJQWCtl("option", "ObjectAdded_callback", ActiveGanttJQWCtl_ObjectAdded);
    $('#oActiveGantt').ActiveGanttJQWCtl("option", "CompleteObjectChange_callback", ActiveGanttJQWCtl_CompleteObjectChange);
    $('#oActiveGantt').ActiveGanttJQWCtl("option", "ToolTipOnMouseHover_callback", ActiveGanttJQWCtl_ToolTipOnMouseHover);
    $('#oActiveGantt').ActiveGanttJQWCtl("option", "ToolTipOnMouseMove_callback", ActiveGanttJQWCtl_ToolTipOnMouseMove);
    window.addEventListener('resize', mp_WindowResize, true);

    mp_LoadImages();

    var oStyle;
    var oView;

    ActiveGanttJQWCtl1.ApplyTemplate(AGJQW.E_CONTROLTEMPLATE.STC_CH_VGRAD_ANAKIWA_BLUE, AGJQW.E_OBJECTTEMPLATE.STO_DEFAULT);

    oStyle = ActiveGanttJQWCtl1.Configuration.DefaultPercentageStyle.Clone("InvisiblePercentages");
    oStyle = ActiveGanttJQWCtl1.Styles.Add("SelectedPredecessor");
    oStyle.PredecessorStyle.LineColor = AGJQW.Color_FromArgb(255, 0, 128, 0);

    ActiveGanttJQWCtl1.ControlTag = "WBSProject";
    ActiveGanttJQWCtl1.AllowRowMove = true;
    ActiveGanttJQWCtl1.AllowRowSize = true;
    ActiveGanttJQWCtl1.AddMode = AGJQW.E_ADDMODE.AT_BOTH;
    ActiveGanttJQWCtl1.Configuration.RowHighlightedBackColor = AGJQW.Color_FromArgb(255, 176, 196, 222);

    var oColumn;

    oColumn = ActiveGanttJQWCtl1.Columns.Add("ID", "", 30, "");
    oColumn.AllowTextEdit = true;

    oColumn = ActiveGanttJQWCtl1.Columns.Add("Task Name", "", 300, "");
    oColumn.AllowTextEdit = true;

    oColumn = ActiveGanttJQWCtl1.Columns.Add("StartDate", "", 125, "");
    oColumn.AllowTextEdit = true;

    oColumn = ActiveGanttJQWCtl1.Columns.Add("EndDate", "", 125, "");
    oColumn.AllowTextEdit = true;

    ActiveGanttJQWCtl1.TreeviewColumnIndex = 2;

    ActiveGanttJQWCtl1.Treeview.Images = true;
    ActiveGanttJQWCtl1.Treeview.CheckBoxes = true;
    ActiveGanttJQWCtl1.Treeview.TreeviewMode = AGJQW.E_TREEVIEWMODE.TM_EXPANDCOLLAPSEICONS;
    ActiveGanttJQWCtl1.Treeview.TreeLines = false;
    ActiveGanttJQWCtl1.Splitter.Position = 255;

    NoDataSource_LoadTasks();

    ActiveGanttJQWCtl1.Rows.UpdateTree();

    //// Start one month before the first task:
    ActiveGanttJQWCtl1.TimeLineScrollBar.StartDate = ActiveGanttJQWCtl1.MathLib.DateTimeAdd(AGJQW.E_INTERVAL.IL_MONTH, -1, mp_dtStartDate);
    ActiveGanttJQWCtl1.TimeLineScrollBar.Interval = AGJQW.E_INTERVAL.IL_HOUR;
    ActiveGanttJQWCtl1.TimeLineScrollBar.Factor = 1;
    ActiveGanttJQWCtl1.TimeLineScrollBar.SmallChange = 6;
    ActiveGanttJQWCtl1.TimeLineScrollBar.LargeChange = 480;
    ActiveGanttJQWCtl1.TimeLineScrollBar.Max = 4000;
    ActiveGanttJQWCtl1.TimeLineScrollBar.Value = 0;
    ActiveGanttJQWCtl1.TimeLineScrollBar.Enabled = true;
    ActiveGanttJQWCtl1.TimeLineScrollBar.Visible = true;



    ActiveGanttJQWCtl1.TierFormat.QuarterIntervalFormat = "yyyy Q\\Q";
    ActiveGanttJQWCtl1.TierFormat.MonthIntervalFormat = "MMM";

    oView = ActiveGanttJQWCtl1.Views.Add(AGJQW.E_INTERVAL.IL_HOUR, 24, AGJQW.E_TIERTYPE.ST_QUARTER, AGJQW.E_TIERTYPE.ST_NOT_VISIBLE, AGJQW.E_TIERTYPE.ST_MONTH);
    oView.TimeLine.TierArea.UpperTier.BackgroundMode = AGJQW.E_TIERBACKGROUNDMODE.ETBGM_STYLE;
    oView.TimeLine.TierArea.UpperTier.Height = 17;
    oView.TimeLine.TierArea.LowerTier.BackgroundMode = AGJQW.E_TIERBACKGROUNDMODE.ETBGM_STYLE;
    oView.TimeLine.TierArea.LowerTier.Height = 17;
    oView.TimeLine.TickMarkArea.Visible = false;
    oView.TimeLine.Position(ActiveGanttJQWCtl1.MathLib.DateTimeAdd(AGJQW.E_INTERVAL.IL_MONTH, -1, mp_dtStartDate));
    oView.ClientArea.DetectConflicts = false;

    oView = oView.Clone();
    oView.Interval = AGJQW.E_INTERVAL.IL_HOUR;
    oView.Factor = 12;

    oView = oView.Clone();
    oView.Interval = AGJQW.E_INTERVAL.IL_HOUR;
    oView.Factor = 6;

    ActiveGanttJQWCtl1.CurrentView = "2";

    mp_SetUpToolTip();

    mp_WindowResize();

});

function mp_WindowResize() {
    $('#oActiveGantt').height(window.innerHeight - 60);
    $('#oActiveGantt').ActiveGanttJQWCtl("Resize");
}

function mp_LoadImages() {
    mp_oFolderClosed.onload = mp_Refresh;
    mp_oFolderClosed.src = "Images/folderclosed.png";
    mp_oFolderOpen.onload = mp_Refresh;
    mp_oFolderOpen.src = "Images/folderopen.png";
    mp_oModules.onload = mp_Refresh;
    mp_oModules.src = "Images/modules.png";
    mp_oTask.onload = mp_Refresh;
    mp_oTask.src = "Images/task.png";
}

function mp_Refresh() {
    mp_lImagesLoaded = mp_lImagesLoaded + 1;
    if (mp_lImagesLoaded == 4) {
        ActiveGanttJQWCtl1.Redraw();
    }
}

function NoDataSource_LoadTasks() {
    AddRow_Task(1, 0, "A", "Capital Plan", new AGJQW.DateTime(2007, 3, 8, 12, 0, 0), new AGJQW.DateTime(2007, 10, 19, 0, 0, 0), 0.4, false, true);
    AddRow_Task(2, 0, "F", "Strategic Projects", new AGJQW.DateTime(2006, 11, 1, 12, 0, 0), new AGJQW.DateTime(2007, 9, 14, 0, 0, 0), 0.75, true, true);
    AddRow_Task(3, 1, "F", "Infrastructure Work Team", new AGJQW.DateTime(2007, 2, 1, 12, 0, 0), new AGJQW.DateTime(2007, 9, 5, 0, 0, 0), 0.77, true, true);
    AddRow_Task(4, 2, "A", "Guys Tower Façade Feasability", new AGJQW.DateTime(2007, 2, 1, 12, 0, 0), new AGJQW.DateTime(2007, 8, 1, 0, 0, 0), 0.6, false, true);
    AddRow_Task(5, 2, "A", "East Wing Cladding (inc Ward Refurbisments)", new AGJQW.DateTime(2007, 4, 21, 0, 0, 0), new AGJQW.DateTime(2007, 9, 5, 0, 0, 0), 0.94, false, true);
    AddRow_Task(6, 1, "F", "Modernisation Workstream", new AGJQW.DateTime(2007, 1, 22, 0, 0, 0), new AGJQW.DateTime(2007, 3, 27, 12, 0, 0), 0.72, true, true);
    AddRow_Task(7, 2, "A", "A&E Reconfiguration", new AGJQW.DateTime(2007, 1, 22, 0, 0, 0), new AGJQW.DateTime(2007, 3, 27, 12, 0, 0), 0.69, false, true);
    AddRow_Task(8, 2, "A", "St. Thomas Main Theatres Study", new AGJQW.DateTime(2007, 1, 28, 0, 0, 0), new AGJQW.DateTime(2007, 3, 18, 12, 0, 0), 0.75, false, true);
    AddRow_Task(9, 1, "F", "Ambulatory Workstream", new AGJQW.DateTime(2007, 3, 9, 12, 0, 0), new AGJQW.DateTime(2007, 6, 5, 12, 0, 0), 0.73, true, true);
    AddRow_Task(10, 2, "A", "PET Feasability", new AGJQW.DateTime(2007, 3, 9, 12, 0, 0), new AGJQW.DateTime(2007, 6, 5, 12, 0, 0), 0.73, false, true);
    AddRow_Task(11, 1, "F", "Cancer Workstream", new AGJQW.DateTime(2006, 11, 1, 12, 0, 0), new AGJQW.DateTime(2007, 9, 14, 0, 0, 0), 0.78, true, true);
    AddRow_Task(12, 2, "A", "Redevelopment of Guys Site Incorporating Cancer Feasability", new AGJQW.DateTime(2007, 1, 11, 0, 0, 0), new AGJQW.DateTime(2007, 8, 11, 12, 0, 0), 0.74, false, true);
    AddRow_Task(13, 2, "A", "Radiotherapy and Chemotherapy Center", new AGJQW.DateTime(2006, 11, 1, 12, 0, 0), new AGJQW.DateTime(2007, 3, 30, 12, 0, 0), 0.94, false, true);
    AddRow_Task(14, 2, "A", "Decant Facilities", new AGJQW.DateTime(2007, 5, 24, 12, 0, 0), new AGJQW.DateTime(2007, 9, 14, 0, 0, 0), 0.65, false, true);
    AddRow_Task(15, 0, "F", "Capital Projects", new AGJQW.DateTime(2006, 9, 1, 12, 0, 0), new AGJQW.DateTime(2007, 12, 12, 0, 0, 0), 0.87, true, true);
    AddRow_Task(16, 1, "A", "4th Floor Block & Refurbishment", new AGJQW.DateTime(2006, 9, 1, 12, 0, 0), new AGJQW.DateTime(2007, 2, 1, 0, 0, 0), 0.93, false, true);
    AddRow_Task(17, 1, "A", "Bio Medical Research Center & CRF", new AGJQW.DateTime(2007, 3, 2, 0, 0, 0), new AGJQW.DateTime(2007, 7, 4, 0, 0, 0), 0.91, false, true);
    AddRow_Task(18, 1, "A", "Blundell Ward Relocation Florence + Aston Key", new AGJQW.DateTime(2007, 8, 7, 12, 0, 0), new AGJQW.DateTime(2007, 11, 12, 12, 0, 0), 0.62, false, true);
    AddRow_Task(19, 1, "A", "Bostock Ward Replacement of Water Treatment Plant", new AGJQW.DateTime(2007, 3, 7, 0, 0, 0), new AGJQW.DateTime(2007, 6, 23, 12, 0, 0), 0.84, false, true);
    AddRow_Task(20, 1, "A", "Centralisation Health Record Storage", new AGJQW.DateTime(2007, 6, 22, 0, 0, 0), new AGJQW.DateTime(2007, 11, 12, 0, 0, 0), 0.78, false, true);
    AddRow_Task(21, 1, "A", "ENT & Audiology Suite Phase II", new AGJQW.DateTime(2006, 12, 31, 12, 0, 0), new AGJQW.DateTime(2007, 3, 10, 0, 0, 0), 0.75, false, true);
    AddRow_Task(22, 1, "A", "GLI Structural Monitoring & Repair", new AGJQW.DateTime(2007, 2, 12, 12, 0, 0), new AGJQW.DateTime(2007, 5, 9, 12, 0, 0), 0.91, false, true);
    AddRow_Task(23, 1, "A", "Pathology Labs (Phase 1A)", new AGJQW.DateTime(2007, 4, 2, 0, 0, 0), new AGJQW.DateTime(2007, 10, 23, 0, 0, 0), 0.95, false, true);
    AddRow_Task(24, 1, "A", "Pathology Labs (Phase 2)", new AGJQW.DateTime(2007, 1, 15, 0, 0, 0), new AGJQW.DateTime(2007, 7, 29, 12, 0, 0), 0.92, false, true);
    AddRow_Task(25, 1, "A", "Pathology: NW5 - CSR Haematology & CSR Labs", new AGJQW.DateTime(2007, 4, 9, 0, 0, 0), new AGJQW.DateTime(2007, 9, 5, 0, 0, 0), 0.88, false, true);
    AddRow_Task(26, 1, "A", "Pathology: Haematology Day Care Center Transfer (NW4 to GT4)", new AGJQW.DateTime(2006, 10, 19, 0, 0, 0), new AGJQW.DateTime(2007, 1, 12, 0, 0, 0), 0.85, false, true);
    AddRow_Task(27, 1, "A", "HDR", new AGJQW.DateTime(2007, 6, 1, 0, 0, 0), new AGJQW.DateTime(2007, 9, 3, 0, 0, 0), 0.85, false, true);
    AddRow_Task(28, 1, "A", "Kidney Treatment Center", new AGJQW.DateTime(2007, 6, 25, 0, 0, 0), new AGJQW.DateTime(2007, 11, 18, 0, 0, 0), 0.76, false, true);
    AddRow_Task(29, 1, "A", "Maternity Expansion Business Case", new AGJQW.DateTime(2006, 11, 9, 12, 0, 0), new AGJQW.DateTime(2007, 4, 6, 0, 0, 0), 0.93, false, true);
    AddRow_Task(30, 1, "A", "New Laminar Flow Theatre at Guy's", new AGJQW.DateTime(2007, 4, 25, 12, 0, 0), new AGJQW.DateTime(2007, 11, 29, 12, 0, 0), 0.89, false, true);
    AddRow_Task(31, 1, "A", "North Wing Basement Entance - Phase 2", new AGJQW.DateTime(2007, 9, 7, 0, 0, 0), new AGJQW.DateTime(2007, 11, 30, 0, 0, 0), 0.88, false, true);
    AddRow_Task(32, 1, "A", "Paediatric Neurosciences Feasibility", new AGJQW.DateTime(2006, 11, 29, 0, 0, 0), new AGJQW.DateTime(2007, 2, 10, 0, 0, 0), 0.9, false, true);
    AddRow_Task(33, 1, "A", "Fluroscopy (Imaging 2) at St. Thomas", new AGJQW.DateTime(2007, 1, 24, 0, 0, 0), new AGJQW.DateTime(2007, 6, 8, 12, 0, 0), 0.94, false, true);
    AddRow_Task(34, 1, "A", "Interventional Radiology Suite (Imaging 3) at GT3 Phase 1", new AGJQW.DateTime(2007, 6, 17, 0, 0, 0), new AGJQW.DateTime(2007, 12, 12, 0, 0, 0), 0.91, false, true);
    AddRow_Task(35, 1, "A", "Interventional Radiology Suite (Imaging 3) at GT3 Phase 2", new AGJQW.DateTime(2007, 8, 12, 0, 0, 0), new AGJQW.DateTime(2007, 12, 1, 12, 0, 0), 0.92, false, true);
    AddRow_Task(36, 1, "A", "Imaging: Radiology Environment & Waiting Areas (Imaging 2) Phases 1 & 2", new AGJQW.DateTime(2006, 11, 27, 12, 0, 0), new AGJQW.DateTime(2007, 1, 25, 12, 0, 0), 1.0, false, true);
    AddRow_Task(37, 1, "A", "Imaging: Radiology Environment & Waiting Areas (Imaging 2) Phase 3", new AGJQW.DateTime(2006, 12, 21, 0, 0, 0), new AGJQW.DateTime(2007, 1, 9, 0, 0, 0), 1.0, false, true);
    AddRow_Task(38, 1, "A", "Relocation of Pharmacy Manufacturing & QC Laboratories", new AGJQW.DateTime(2007, 6, 7, 12, 0, 0), new AGJQW.DateTime(2007, 8, 20, 12, 0, 0), 0.93, false, true);
    AddRow_Task(39, 1, "A", "Samaritan Ward - Bone marrow transplant beds", new AGJQW.DateTime(2007, 6, 1, 0, 0, 0), new AGJQW.DateTime(2007, 8, 18, 0, 0, 0), 0.94, false, true);
    AddRow_Task(40, 1, "A", "Sexual Health Relocation", new AGJQW.DateTime(2007, 1, 10, 12, 0, 0), new AGJQW.DateTime(2007, 4, 12, 12, 0, 0), 1.0, false, true);
    AddRow_Task(41, 1, "A", "St. Thomas HV Upgrade", new AGJQW.DateTime(2007, 5, 2, 12, 0, 0), new AGJQW.DateTime(2007, 6, 20, 12, 0, 0), 0.52, false, true);
    AddRow_Task(42, 1, "A", "Ultrasound (Imaging 2) at Guy's", new AGJQW.DateTime(2007, 6, 5, 12, 0, 0), new AGJQW.DateTime(2007, 6, 22, 12, 0, 0), 1.0, false, true);
    AddRow_Task(43, 1, "F", "New Schemes Approved in Year", new AGJQW.DateTime(2006, 11, 15, 12, 0, 0), new AGJQW.DateTime(2007, 9, 4, 12, 0, 0), 0.78, true, true);
    AddRow_Task(44, 2, "A", "Modular Theatres", new AGJQW.DateTime(2006, 11, 15, 12, 0, 0), new AGJQW.DateTime(2007, 1, 1, 12, 0, 0), 0.84, false, true);
    AddRow_Task(45, 2, "A", "ECH - Theatre Ventilation", new AGJQW.DateTime(2006, 12, 24, 0, 0, 0), new AGJQW.DateTime(2007, 9, 4, 12, 0, 0), 0.77, false, true);
    AddRow_Task(46, 2, "A", "Modular Pharmacy Aseptic Unit", new AGJQW.DateTime(2006, 12, 22, 12, 0, 0), new AGJQW.DateTime(2007, 1, 28, 12, 0, 0), 0.82, false, true);
    AddRow_Task(47, 2, "A", "Acute Stroke Unit Bid", new AGJQW.DateTime(2007, 4, 11, 0, 0, 0), new AGJQW.DateTime(2007, 7, 20, 0, 0, 0), 0.74, false, true);
    AddRow_Task(48, 2, "A", "Chemo Centralisation", new AGJQW.DateTime(2006, 12, 26, 0, 0, 0), new AGJQW.DateTime(2007, 3, 30, 0, 0, 0), 0.9, false, true);
    AddRow_Task(49, 2, "A", "Feasability of MRI at Guy's", new AGJQW.DateTime(2007, 5, 12, 0, 0, 0), new AGJQW.DateTime(2007, 7, 25, 0, 0, 0), 0.59, false, true);
    AddRow_Task(50, 0, "F", "Engineering", new AGJQW.DateTime(2006, 10, 17, 0, 0, 0), new AGJQW.DateTime(2007, 9, 15, 12, 0, 0), 0.7, true, true);
    AddRow_Task(51, 1, "A", "Borough Wing Theatre Ductwork and Heater Batteries", new AGJQW.DateTime(2007, 5, 2, 0, 0, 0), new AGJQW.DateTime(2007, 6, 20, 0, 0, 0), 0.85, false, true);
    AddRow_Task(52, 1, "A", "Combined Heat and Power System at Guy's", new AGJQW.DateTime(2007, 1, 20, 12, 0, 0), new AGJQW.DateTime(2007, 4, 15, 12, 0, 0), 0.88, false, true);
    AddRow_Task(53, 1, "A", "Combined Heat and Power System at St. Thomas", new AGJQW.DateTime(2007, 3, 10, 12, 0, 0), new AGJQW.DateTime(2007, 9, 15, 12, 0, 0), 0.74, false, true);
    AddRow_Task(54, 1, "A", "Electrical Power Monitoring", new AGJQW.DateTime(2006, 11, 20, 0, 0, 0), new AGJQW.DateTime(2007, 8, 22, 12, 0, 0), 0.88, false, true);
    AddRow_Task(55, 1, "A", "Guy's Lifts 101-105 (Guys Tower)", new AGJQW.DateTime(2006, 12, 6, 0, 0, 0), new AGJQW.DateTime(2007, 3, 3, 0, 0, 0), 0.88, false, true);
    AddRow_Task(56, 1, "A", "Guy's Lifts 110-114 (Guys Tower)", new AGJQW.DateTime(2007, 5, 15, 12, 0, 0), new AGJQW.DateTime(2007, 7, 1, 12, 0, 0), 0.5, false, true);
    AddRow_Task(57, 1, "A", "Motor Control Panel Refurbishment", new AGJQW.DateTime(2007, 1, 9, 0, 0, 0), new AGJQW.DateTime(2007, 6, 13, 0, 0, 0), 0.7, false, true);
    AddRow_Task(58, 1, "A", "North Wing / Lambeth Wing Air Supply Plants", new AGJQW.DateTime(2007, 1, 13, 0, 0, 0), new AGJQW.DateTime(2007, 4, 19, 0, 0, 0), 0.21, false, true);
    AddRow_Task(59, 1, "A", "North Wing Chiller Replacement", new AGJQW.DateTime(2007, 1, 9, 0, 0, 0), new AGJQW.DateTime(2007, 6, 16, 0, 0, 0), 0.5, false, true);
    AddRow_Task(60, 1, "A", "North Wing Replacement Generator", new AGJQW.DateTime(2006, 12, 10, 12, 0, 0), new AGJQW.DateTime(2007, 6, 11, 0, 0, 0), 0.76, false, true);
    AddRow_Task(61, 1, "A", "NW/LW Riser Refurbishment", new AGJQW.DateTime(2007, 1, 20, 12, 0, 0), new AGJQW.DateTime(2007, 3, 17, 12, 0, 0), 0.5, false, true);
    AddRow_Task(62, 1, "A", "Satchwell BMS Upgrade", new AGJQW.DateTime(2006, 12, 16, 12, 0, 0), new AGJQW.DateTime(2007, 7, 18, 12, 0, 0), 0.91, false, true);
    AddRow_Task(63, 1, "A", "St. Thomas Increase Standby Capacity - Phase 2", new AGJQW.DateTime(2007, 1, 2, 0, 0, 0), new AGJQW.DateTime(2007, 6, 18, 0, 0, 0), 0.8, false, true);
    AddRow_Task(64, 1, "A", "Substation 3 HV Works (St. Thomas)", new AGJQW.DateTime(2007, 2, 27, 0, 0, 0), new AGJQW.DateTime(2007, 8, 10, 12, 0, 0), 0.78, false, true);
    AddRow_Task(65, 1, "A", "TB Electrical Distribution", new AGJQW.DateTime(2006, 10, 17, 0, 0, 0), new AGJQW.DateTime(2007, 6, 29, 12, 0, 0), 0.73, false, true);
    AddRow_Task(66, 1, "A", "Tower Wing Dental Theatre Air Handling Unit", new AGJQW.DateTime(2006, 12, 30, 12, 0, 0), new AGJQW.DateTime(2007, 3, 24, 12, 0, 0), 0.75, false, true);
    AddRow_Task(67, 1, "A", "Tower Wing Recovery Air Handling Unit", new AGJQW.DateTime(2007, 3, 2, 0, 0, 0), new AGJQW.DateTime(2007, 8, 8, 0, 0, 0), 0.7, false, true);
    AddRow_Task(68, 1, "A", "Water Booster Pumps - Phase 1 & 2", new AGJQW.DateTime(2007, 1, 8, 12, 0, 0), new AGJQW.DateTime(2007, 6, 14, 12, 0, 0), 0.64, false, true);
    AddRow_Task(69, 1, "A", "Water Softner - Boiler House", new AGJQW.DateTime(2007, 2, 12, 12, 0, 0), new AGJQW.DateTime(2007, 7, 30, 12, 0, 0), 0.66, false, true);
    AddRow_Task(70, 1, "A", "Energy Efficiency", new AGJQW.DateTime(2007, 3, 31, 12, 0, 0), new AGJQW.DateTime(2007, 9, 4, 12, 0, 0), 0.72, false, true);
    AddRow_Task(71, 0, "F", "PEAT Plan", new AGJQW.DateTime(2006, 11, 5, 0, 0, 0), new AGJQW.DateTime(2008, 1, 21, 0, 0, 0), 0.82, true, true);
    AddRow_Task(72, 1, "A", "Hilliers Ward Refurb St. Thomas", new AGJQW.DateTime(2007, 3, 28, 0, 0, 0), new AGJQW.DateTime(2007, 5, 23, 12, 0, 0), 0.79, false, true);
    AddRow_Task(73, 1, "A", "William Gull Ward St. Thomas", new AGJQW.DateTime(2007, 3, 20, 0, 0, 0), new AGJQW.DateTime(2007, 8, 23, 0, 0, 0), 0.77, false, true);
    AddRow_Task(74, 1, "A", "Henry Ward Day Room", new AGJQW.DateTime(2007, 4, 29, 0, 0, 0), new AGJQW.DateTime(2007, 6, 1, 0, 0, 0), 0.8, false, true);
    AddRow_Task(75, 1, "A", "Sarah Swift Ward", new AGJQW.DateTime(2006, 11, 5, 0, 0, 0), new AGJQW.DateTime(2007, 2, 3, 0, 0, 0), 0.78, false, true);
    AddRow_Task(76, 1, "A", "Victoria Ward", new AGJQW.DateTime(2007, 5, 10, 12, 0, 0), new AGJQW.DateTime(2007, 7, 14, 12, 0, 0), 0.91, false, true);
    AddRow_Task(77, 1, "A", "Appointment Center Staff Toilets", new AGJQW.DateTime(2007, 1, 16, 0, 0, 0), new AGJQW.DateTime(2007, 4, 7, 12, 0, 0), 0.77, false, true);
    AddRow_Task(78, 1, "A", "Page Ward", new AGJQW.DateTime(2007, 5, 19, 12, 0, 0), new AGJQW.DateTime(2007, 7, 16, 12, 0, 0), 0.74, false, true);
    AddRow_Task(79, 1, "A", "Nightingdale Ward - Side Rooms", new AGJQW.DateTime(2007, 2, 18, 0, 0, 0), new AGJQW.DateTime(2007, 4, 28, 0, 0, 0), 0.77, false, true);
    AddRow_Task(80, 1, "A", "Luke Ward - Side Rooms", new AGJQW.DateTime(2007, 11, 14, 12, 0, 0), new AGJQW.DateTime(2007, 12, 31, 12, 0, 0), 0.8, false, true);
    AddRow_Task(81, 1, "A", "Therapies Department - Disabled Toilets", new AGJQW.DateTime(2007, 7, 31, 12, 0, 0), new AGJQW.DateTime(2007, 9, 26, 12, 0, 0), 0.81, false, true);
    AddRow_Task(82, 1, "A", "Northumberland Ward Side Rooms", new AGJQW.DateTime(2007, 4, 18, 0, 0, 0), new AGJQW.DateTime(2007, 6, 6, 0, 0, 0), 0.83, false, true);
    AddRow_Task(83, 1, "A", "General Outpatients", new AGJQW.DateTime(2007, 10, 17, 0, 0, 0), new AGJQW.DateTime(2008, 1, 21, 0, 0, 0), 0.86, false, true);
    AddRow_Task(84, 1, "A", "Rheumatology Clinic", new AGJQW.DateTime(2007, 5, 3, 0, 0, 0), new AGJQW.DateTime(2007, 5, 28, 0, 0, 0), 0.84, false, true);
    AddRow_Task(85, 1, "A", "Diabetes Clinic", new AGJQW.DateTime(2007, 1, 8, 12, 0, 0), new AGJQW.DateTime(2007, 3, 18, 12, 0, 0), 0.86, false, true);
    AddRow_Task(86, 1, "A", "ENT Clinic", new AGJQW.DateTime(2007, 4, 14, 12, 0, 0), new AGJQW.DateTime(2007, 10, 28, 12, 0, 0), 0.91, false, true);
    AddRow_Task(87, 0, "F", "Buildings Improvement Programs", new AGJQW.DateTime(2006, 10, 18, 12, 0, 0), new AGJQW.DateTime(2007, 10, 28, 0, 0, 0), 0.75, true, true);
    AddRow_Task(88, 1, "F", "Environmental Improvement Plan", new AGJQW.DateTime(2006, 10, 18, 12, 0, 0), new AGJQW.DateTime(2007, 10, 28, 0, 0, 0), 0.75, false, false);
    AddRow_Task(89, 2, "A", "Ward Improvementrs", new AGJQW.DateTime(2006, 10, 18, 12, 0, 0), new AGJQW.DateTime(2007, 10, 15, 12, 0, 0), 0.61, false, true);
    AddRow_Task(90, 2, "A", "Outpatient / Clinics", new AGJQW.DateTime(2006, 12, 29, 0, 0, 0), new AGJQW.DateTime(2007, 8, 11, 0, 0, 0), 0.74, false, true);
    AddRow_Task(91, 2, "A", "Circulation Areas", new AGJQW.DateTime(2007, 4, 14, 12, 0, 0), new AGJQW.DateTime(2007, 10, 28, 0, 0, 0), 0.74, false, true);
    AddRow_Task(92, 2, "A", "St. Thomas Main Entrance", new AGJQW.DateTime(2007, 2, 28, 0, 0, 0), new AGJQW.DateTime(2007, 6, 8, 0, 0, 0), 0.76, false, true);
    AddRow_Task(93, 2, "A", "St. Thomas Retail Mall", new AGJQW.DateTime(2007, 1, 1, 0, 0, 0), new AGJQW.DateTime(2007, 2, 6, 0, 0, 0), 0.81, false, true);
    AddRow_Task(94, 2, "A", "Guys Main Entrance Revolving Door", new AGJQW.DateTime(2007, 3, 28, 12, 0, 0), new AGJQW.DateTime(2007, 4, 25, 12, 0, 0), 0.83, false, true);

    AddPredecessor(16, 17, AGJQW.E_CONSTRAINTTYPE.PCT_END_TO_START, 696, AGJQW.E_INTERVAL.IL_HOUR);     //End-To-Start with lag (down)
    AddPredecessor(13, 5, AGJQW.E_CONSTRAINTTYPE.PCT_END_TO_START, 516, AGJQW.E_INTERVAL.IL_HOUR);      //End-To-Start with lag (up)
    AddPredecessor(21, 22, AGJQW.E_CONSTRAINTTYPE.PCT_END_TO_START, -612, AGJQW.E_INTERVAL.IL_HOUR);    //End-To-Start with lead (down)
    AddPredecessor(24, 19, AGJQW.E_CONSTRAINTTYPE.PCT_END_TO_START, -3468, AGJQW.E_INTERVAL.IL_HOUR);   //End-To-Start with lead (up)

    AddPredecessor(18, 20, AGJQW.E_CONSTRAINTTYPE.PCT_START_TO_END, 2316, AGJQW.E_INTERVAL.IL_HOUR);    //Start-To-End with lag (down)
    AddPredecessor(29, 26, AGJQW.E_CONSTRAINTTYPE.PCT_START_TO_END, 1524, AGJQW.E_INTERVAL.IL_HOUR);    //Start-To-End with lag (up)
    AddPredecessor(27, 32, AGJQW.E_CONSTRAINTTYPE.PCT_START_TO_END, -2664, AGJQW.E_INTERVAL.IL_HOUR);   //Start-To-End with lead (down)
    AddPredecessor(38, 36, AGJQW.E_CONSTRAINTTYPE.PCT_START_TO_END, -3192, AGJQW.E_INTERVAL.IL_HOUR);   //Start-To-End with lead (up)

    AddPredecessor(12, 14, AGJQW.E_CONSTRAINTTYPE.PCT_START_TO_START, 3204, AGJQW.E_INTERVAL.IL_HOUR);  //Start-To-Start with lag (down)
    AddPredecessor(48, 47, AGJQW.E_CONSTRAINTTYPE.PCT_START_TO_START, 2544, AGJQW.E_INTERVAL.IL_HOUR);  //Start-To-Start with lag (up)
    AddPredecessor(52, 55, AGJQW.E_CONSTRAINTTYPE.PCT_START_TO_START, -1092, AGJQW.E_INTERVAL.IL_HOUR); //Start-To-Start with lead (down)
    AddPredecessor(56, 53, AGJQW.E_CONSTRAINTTYPE.PCT_START_TO_START, -1584, AGJQW.E_INTERVAL.IL_HOUR); //Start-To-Start with lead (up)

    AddPredecessor(40, 41, AGJQW.E_CONSTRAINTTYPE.PCT_END_TO_END, 1656, AGJQW.E_INTERVAL.IL_HOUR);      //End-To-End with lag (down)
    AddPredecessor(58, 57, AGJQW.E_CONSTRAINTTYPE.PCT_END_TO_END, 1320, AGJQW.E_INTERVAL.IL_HOUR);      //End-To-End with lag (up)
    AddPredecessor(62, 63, AGJQW.E_CONSTRAINTTYPE.PCT_END_TO_END, -732, AGJQW.E_INTERVAL.IL_HOUR);      //End-To-End with lead (down)
    AddPredecessor(67, 65, AGJQW.E_CONSTRAINTTYPE.PCT_END_TO_END, -948, AGJQW.E_INTERVAL.IL_HOUR);      //End-To-End with lead (up)
}

function AddRow_Task(lID, lDepth, sTaskType, sDescription, dtStartDate, dtEndDate, fPercentCompleted, bSummary, bHasTasks) {
    var oRow = null;
    var oTask = null;
    oRow = ActiveGanttJQWCtl1.Rows.Add("K" + lID, sDescription);
    oRow.Cells.Item("1").Text = lID;
    oRow.Cells.Item("1").StyleIndex = "CH";
    oRow.Height = 20;
    oRow.Node.AllowTextEdit = true;
    if (sTaskType == "F")
    {
        if (lDepth == 0)
        {
            oRow.Node.Image = mp_oFolderClosed;
            oRow.Node.ExpandedImage = mp_oFolderOpen;
            oRow.Node.StyleIndex = "NB";
        }
        else
        {
            oRow.Node.Image = mp_oModules;
            oRow.Node.StyleIndex = "NR";
        }
    }
    else if (sTaskType == "A")
    {
        oRow.Node.StyleIndex = "NR";
        oRow.Node.Image = mp_oTask;
        oRow.Node.CheckBoxVisible = true;
    }
    oRow.Node.Depth = lDepth;
    oRow.Node.ImageVisible = true;
    oRow.Node.AllowTextEdit = true;
    if ((mp_dtStartDate.DateTimePart.getTime() == 0))
    {
        mp_dtStartDate = dtStartDate;
    }
    else
    {
        if ((dtStartDate.valueOf() < mp_dtStartDate.valueOf()))
        {
            mp_dtStartDate = dtStartDate;
        }
    }
    if ((mp_dtEndDate.DateTimePart.getTime() == 0))
    {
        mp_dtEndDate = dtEndDate;
    }
    else
    {
        if ((dtEndDate.valueOf() > mp_dtEndDate.valueOf()))
        {
            mp_dtEndDate = dtEndDate;
        }
    }
    oTask = ActiveGanttJQWCtl1.Tasks.Add("", "K" + lID, dtStartDate, dtEndDate, "T" + lID, "", "");
    SetTaskGridColumns(oTask);
    if (bSummary == true)
    {
        //// Prevent user from moving/sizing summary tasks
        oTask.AllowedMovement = AGJQW.E_MOVEMENTTYPE.MT_MOVEMENTDISABLED;
        oTask.AllowStretchLeft = false;
        oTask.AllowStretchRight = false;
        //// Prevent user from adding tasks in these Rows
        oRow.Container = false;
        //// Apply Summary Style 
        if (oRow.Node.Depth == 0)
        {
            oTask.StyleIndex = "S3";
            ActiveGanttJQWCtl1.Percentages.Add("T" + lID, "SP3", fPercentCompleted, "");
        }
        else if (oRow.Node.Depth == 1)
        {
            oTask.StyleIndex = "S2";
            ActiveGanttJQWCtl1.Percentages.Add("T" + lID, "SP2", fPercentCompleted, "");
        }
        ActiveGanttJQWCtl1.Percentages.Item(ActiveGanttJQWCtl1.Percentages.Count).AllowSize = false;
    }
    else
    {
        oTask.AllowedMovement = AGJQW.E_MOVEMENTTYPE.MT_RESTRICTEDTOROW;
        oTask.StyleIndex = "T1";
        oTask.WarningStyleIndex = "TW1";
        if (bHasTasks == false)
        {
            oTask.Visible = false;
            //// Prevent user from adding tasks in these rows
            oRow.Container = false;
            ActiveGanttJQWCtl1.Percentages.Add("T" + lID, "InvisiblePercentages", fPercentCompleted, "");
            ActiveGanttJQWCtl1.Percentages.Item(ActiveGanttJQWCtl1.Percentages.Count).AllowSize = false;
        }
        else
        {
            ActiveGanttJQWCtl1.Percentages.Add("T" + lID, "P1", fPercentCompleted, "");
        }
    }
}

function AddPredecessor(lPredecessorID, lSuccessorID, yType, lLagFactor, yLagInterval) {
    var oPredecessor;
    oPredecessor = ActiveGanttJQWCtl1.Predecessors.Add("T" + lSuccessorID, "T" + lPredecessorID, yType, "", "T1");
    oPredecessor.WarningStyleIndex = "TW1";
    oPredecessor.SelectedStyleIndex = "SelectedPredecessor";
    oPredecessor.LagFactor = lLagFactor;
    oPredecessor.LagInterval = yLagInterval;
}

function SetTaskGridColumns(oTask) {
    oTask.Row.Cells.Item("3").Text = oTask.StartDate.ToString("MM/dd/yyyy");
    oTask.Row.Cells.Item("4").Text = oTask.EndDate.ToString("MM/dd/yyyy");
}

function GetImage(sFileName) {
    var oImage = new Image();
    oImage.src = sFileName;
    return oImage;
}

function cmdZoomin_Click() {
    if (Number(ActiveGanttJQWCtl1.CurrentView) < 3) {
        ActiveGanttJQWCtl1.CurrentView = (Number(ActiveGanttJQWCtl1.CurrentView) + 1).toString();
        ActiveGanttJQWCtl1.Redraw();
    }
}

function cmdZoomout_Click() {
    if (Number(ActiveGanttJQWCtl1.CurrentView) > 1) {
        ActiveGanttJQWCtl1.CurrentView = (Number(ActiveGanttJQWCtl1.CurrentView) - 1).toString();
        ActiveGanttJQWCtl1.Redraw();
    }
}

function cmdBluePercentages_Click() {
    mp_bBluePercentagesVisible = !mp_bBluePercentagesVisible;
    var i;
    for (i = 1; i <= ActiveGanttJQWCtl1.Percentages.Count; i++) {
        oPercentage = ActiveGanttJQWCtl1.Percentages.Item(i);
        if (oPercentage.StyleIndex == "P1")
        {
            oPercentage.Visible = mp_bBluePercentagesVisible;
        }
    }
    ActiveGanttJQWCtl1.Redraw();
}

function cmdGreenPercentages_Click() {
    mp_bGreenPercentagesVisible = !mp_bGreenPercentagesVisible;
    var i;
    for (i = 1; i <= ActiveGanttJQWCtl1.Percentages.Count; i++) {
        oPercentage = ActiveGanttJQWCtl1.Percentages.Item(i);
        if (oPercentage.StyleIndex == "SP2") {
            oPercentage.Visible = mp_bGreenPercentagesVisible;
        }
    }
    ActiveGanttJQWCtl1.Redraw();
}

function cmdRedPercentages_Click() {
    mp_bRedPercentagesVisible = !mp_bRedPercentagesVisible;
    var i;
    for (i = 1; i <= ActiveGanttJQWCtl1.Percentages.Count; i++) {
        oPercentage = ActiveGanttJQWCtl1.Percentages.Item(i);
        if (oPercentage.StyleIndex == "SP3") {
            oPercentage.Visible = mp_bRedPercentagesVisible;
        }
    }
    ActiveGanttJQWCtl1.Redraw();
}

function cmdToolTips_Click() {
    ActiveGanttJQWCtl1.CurrentViewObject.ClientArea.ToolTipsVisible = !ActiveGanttJQWCtl1.CurrentViewObject.ClientArea.ToolTipsVisible;
    ActiveGanttJQWCtl1.Redraw();
}

function cmdHelp_Click() {
    window.open('http://www.sourcecodestore.com/Article.aspx?ID=17', '_blank');
}

function ActiveGanttJQWCtl_NodeChecked(sender, e) {
    var oRow;
    oRow = ActiveGanttJQWCtl1.Rows.Item(e.Index);
    oRow.Highlighted = oRow.Node.Checked;
}

function ActiveGanttJQWCtl_ObjectAdded(sender, e) {
    switch (e.EventTarget)
    {
        case AGJQW.E_EVENTTARGET.EVT_TASK:
        case AGJQW.E_EVENTTARGET.EVT_MILESTONE:
            var oTask = null;
            oTask = GetTaskByRowKey(ActiveGanttJQWCtl1.Tasks.Item(e.TaskIndex).RowKey);
            oTask.StartDate = ActiveGanttJQWCtl1.Tasks.Item(e.TaskIndex).StartDate;
            oTask.EndDate = ActiveGanttJQWCtl1.Tasks.Item(e.TaskIndex).EndDate;
            UpdateTask(oTask.Index);
            ActiveGanttJQWCtl1.Tasks.Remove(e.TaskIndex);
            break;
        case AGJQW.E_EVENTTARGET.EVT_PREDECESSOR:
            ActiveGanttJQWCtl1.Predecessors.Item(e.PredecessorObjectIndex).StyleIndex = "T1";
            ActiveGanttJQWCtl1.Predecessors.Item(e.PredecessorObjectIndex).WarningStyleIndex = "TW1";
            ActiveGanttJQWCtl1.Predecessors.Item(e.PredecessorObjectIndex).SelectedStyleIndex = "SelectedPredecessor";
            InsertPredecessor(e.PredecessorTaskKey, e.TaskKey, e.PredecessorType);
            break;
    }
}

function ActiveGanttJQWCtl_CompleteObjectChange(sender, e) {
    switch (e.EventTarget)
    {
        case AGJQW.E_EVENTTARGET.EVT_TASK:
            UpdateTask(e.Index);
            break;
        case AGJQW.E_EVENTTARGET.EVT_PERCENTAGE:
            var lTaskIndex = 0;
            lTaskIndex = ActiveGanttJQWCtl1.Tasks.Item(ActiveGanttJQWCtl1.Percentages.Item(e.Index).TaskKey).Index;
            UpdateTask(lTaskIndex);
            break;
    }
}

function GetTaskByRowKey(sRowKey)
{
    var i;
    for (i = 1; i <= ActiveGanttJQWCtl1.Tasks.Count; i++) {
        var oTask = ActiveGanttJQWCtl1.Tasks.Item(i);
        if (oTask.RowKey == sRowKey) {
            return oTask;
        }
    }
    return null;
}

function UpdateTask(Index)
{
    var oPercentage = GetPercentageByTaskKey(ActiveGanttJQWCtl1.Tasks.Item(Index).Key);
    var oTask = ActiveGanttJQWCtl1.Tasks.Item(Index);
    SetTaskGridColumns(oTask);
    var sRowKey = oTask.RowKey;
    var oNode = ActiveGanttJQWCtl1.Rows.Item(sRowKey).Node;
    UpdateSummary(oNode);
}

function GetPercentageByTaskKey(sTaskKey)
{
    var i;
    for (i = 1; i <= ActiveGanttJQWCtl1.Percentages.Count; i++) {
        var oPercentage = ActiveGanttJQWCtl1.Percentages.Item(i);
        if (oPercentage.TaskKey == sTaskKey)
        {
            return oPercentage;
        }
    }
    return null;
}

function UpdateSummary(oNode)
{
    var oParentNode = null;
    var oSummaryTask = null;
    var oSummaryPercentage = null;
    oParentNode = oNode.Parent();
    while ((oParentNode != null))
    {
        oSummaryTask = GetTaskByRowKey(oParentNode.Row.Key);
        oSummaryPercentage = GetPercentageByTaskKey(oSummaryTask.Key);
        if ((oSummaryTask != null))
        {
            var oChildTask = null;
            var oChildPercentage = null;
            var oChildNode = null;
            var dtSumStartDate = new AGJQW.DateTime();
            var dtSumEndDate = new AGJQW.DateTime();
            var lPercentagesCount = 0;
            var fPercentagesSum = 0;
            var fPercentageAvg = 0;
            oChildNode = oParentNode.Child();
            while ((oChildNode != null))
            {
                oChildTask = GetTaskByRowKey(oChildNode.Row.Key);
                oChildPercentage = GetPercentageByTaskKey(oChildTask.Key);
                lPercentagesCount = lPercentagesCount + 1;
                fPercentagesSum = fPercentagesSum + oChildPercentage.Percent;
                if ((oChildTask != null))
                {
                    if (dtSumStartDate.DateTimePart.getTime() == 0)
                    {
                        dtSumStartDate = oChildTask.StartDate;
                    }
                    else
                    {
                        if (oChildTask.StartDate.valueOf() < dtSumStartDate.valueOf())
                        {
                            dtSumStartDate = oChildTask.StartDate;
                        }
                    }
                    if (dtSumEndDate.DateTimePart.getTime() == 0)
                    {
                        dtSumEndDate = oChildTask.EndDate;
                    }
                    else
                    {
                        if (oChildTask.EndDate.valueOf() > dtSumEndDate.valueOf())
                        {
                            dtSumEndDate = oChildTask.EndDate;
                        }
                    }
                }
                oChildNode = oChildNode.NextSibling();
            }
            fPercentageAvg = fPercentagesSum / lPercentagesCount;
            oSummaryTask.StartDate = dtSumStartDate;
            oSummaryTask.EndDate = dtSumEndDate;
            SetTaskGridColumns(oSummaryTask);
            oSummaryPercentage.Percent = fPercentageAvg;
        }
        oParentNode = oParentNode.Parent();
    }
}

function mp_SetUpToolTip() {
    var oToolTip = $('#oActiveGantt').ActiveGanttJQWCtl("GetToolTip");
    oToolTip.css("background-color", "#ffffe0");
    oToolTip.css("font-family", "Tahoma");
    oToolTip.css("font-size", "11px");
    oToolTip.css("padding", "3px");
    oToolTip.css("border", "1px solid black");
    var sTable = "";
    sTable += "<table style='width: 300px; border-bottom: 1px solid black;'>";
    sTable += "<tr><td style='width: 16px;'><img id='oImage' src='' /></td><td style='width: 384; text-align: center;'><span id='sTaskName'></span></td></tr>";
    sTable += "</table>";
    sTable += "<div id='sDuration'></div>";
    sTable += "<div id='sFrom'></div>";
    sTable += "<div id='sCompleted'></div>";
    oToolTip.append(sTable);
}

function ActiveGanttJQWCtl_ToolTipOnMouseHover(sender, e) {
    var oToolTip = $('#oActiveGantt').ActiveGanttJQWCtl("GetToolTip");
    switch (e.EventTarget) {
        case AGJQW.E_EVENTTARGET.EVT_TASK:
        case AGJQW.E_EVENTTARGET.EVT_SELECTEDTASK:
        case AGJQW.E_EVENTTARGET.EVT_PERCENTAGE:
        case AGJQW.E_EVENTTARGET.EVT_SELECTEDPERCENTAGE:
            var lRowIndex = ActiveGanttJQWCtl1.MathLib.GetRowIndexByPosition(e.Y);
            var lTaskIndex = ActiveGanttJQWCtl1.MathLib.GetTaskIndexByPosition(e.X, e.Y);
            if (lRowIndex != -1 && lTaskIndex != -1) {
                var oRow = ActiveGanttJQWCtl1.Rows.Item(lRowIndex);
                var oTask = ActiveGanttJQWCtl1.Tasks.Item(lTaskIndex);
                var oPercentage = GetPercentageByTaskKey(oTask.Key)
                var fPercentage = oPercentage.Percent * 100;
                $("#sTaskName").text(oRow.Text);
                $("#oImage").attr("src", oRow.Node.Image.src);
                $("#sDuration").text("Duration: " + ActiveGanttJQWCtl1.MathLib.DateTimeDiff(AGJQW.E_INTERVAL.IL_DAY, oTask.StartDate, oTask.EndDate) + " days");
                $("#sFrom").text("From: " + oTask.StartDate.ToString("ddd MMM d, yyyy") + " To " + oTask.EndDate.ToString("ddd MMM d, yyyy"));
                $("#sCompleted").text("Percent Completed: " + fPercentage.toFixed(2) + "%");
                var lWidth = $('#oActiveGantt').ActiveGanttJQWCtl("Width");
                var lHeight = $('#oActiveGantt').ActiveGanttJQWCtl("Height");
                var lToolTipHeight = oToolTip.height();
                if ((e.X + 20 + 300) < lWidth) {
                    oToolTip.css("left", e.X + 20);
                } else {
                    oToolTip.css("left", e.X - 20 - 300);
                }
                if ((e.Y + 20 + lToolTipHeight < lHeight)) {
                    oToolTip.css("top", e.Y + 20);
                } else {
                    oToolTip.css("top", e.Y - 20 - lToolTipHeight);
                }
                oToolTip.show();
            }
            break;
        default:
            oToolTip.hide();
    }    
}

function ActiveGanttJQWCtl_ToolTipOnMouseMove(sender, e) {
    var oToolTip = $('#oActiveGantt').ActiveGanttJQWCtl("GetToolTip");
    switch (e.Operation) {
        case AGJQW.E_OPERATION.EO_PERCENTAGESIZING:
        case AGJQW.E_OPERATION.EO_TASKMOVEMENT:
        case AGJQW.E_OPERATION.EO_TASKSTRETCHLEFT:
        case AGJQW.E_OPERATION.EO_TASKSTRETCHRIGHT:
            var lRowIndex = ActiveGanttJQWCtl1.MathLib.GetRowIndexByPosition(e.Y);
            var lTaskIndex = ActiveGanttJQWCtl1.MathLib.GetTaskIndexByPosition(e.X, e.Y);
            if (lRowIndex != -1 && lTaskIndex != -1) {
                var oRow = ActiveGanttJQWCtl1.Rows.Item(lRowIndex);
                var oTask = ActiveGanttJQWCtl1.Tasks.Item(lTaskIndex);
                var oPercentage = GetPercentageByTaskKey(oTask.Key)
                var fPercentage;
                if (e.Operation == AGJQW.E_OPERATION.EO_PERCENTAGESIZING) {
                    fPercentage = (e.X - e.XStart) / (e.XEnd - e.XStart) * 100;
                } else {
                    fPercentage = oPercentage.Percent * 100;
                }
                $("#sTaskName").text(oRow.Text);
                $("#oImage").attr("src", oRow.Node.Image.src);
                $("#sDuration").text("Duration: " + ActiveGanttJQWCtl1.MathLib.DateTimeDiff(AGJQW.E_INTERVAL.IL_DAY, e.StartDate, e.EndDate) + " days");
                $("#sFrom").text("From: " + e.StartDate.ToString("ddd MMM d, yyyy") + " To " + e.EndDate.ToString("ddd MMM d, yyyy"));
                $("#sCompleted").text("Percent Completed: " + fPercentage.toFixed(2) + "%");
                var lWidth = $('#oActiveGantt').ActiveGanttJQWCtl("Width");
                var lHeight = $('#oActiveGantt').ActiveGanttJQWCtl("Height");
                var lToolTipHeight = oToolTip.height();
                if ((e.X + 20 + 300) < lWidth) {
                    oToolTip.css("left", e.X + 20);
                } else {
                    oToolTip.css("left", e.X - 20 - 300);
                }
                if ((e.Y + 20 + lToolTipHeight < lHeight)) {
                    oToolTip.css("top", e.Y + 20);
                } else {
                    oToolTip.css("top", e.Y - 20 - lToolTipHeight);
                }
                oToolTip.show();
            }
            break;
        default:
            oToolTip.hide();
    }
}



