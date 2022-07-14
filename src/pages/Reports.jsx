import ReportsList from "../components/Reports/ReportsList";


const Reports = () => {
  return (
    <div className="page">
      <h3 className="page__title">My Reports</h3>

      <div className="report-page__body">
        <div className="reports__reports-list">
          <ReportsList />
        </div>
      </div>
    </div>
  );
};

export default Reports;
