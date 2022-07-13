import ReportsList from "../components/Reports/ReportsList";


const Reports = () => {
  return (
    <div className="reports-page">
      <div className="report-page__body">
        <div className="reports__reports-list">
          <ReportsList />
        </div>
      </div>
    </div>
  );
};

export default Reports;
