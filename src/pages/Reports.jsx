import ReportsList from "../components/Reports/ReportsList";

const Reports = () => {
  return (
    <div className="reports-page">
      <h3 className="reports-page__title">My Reports</h3>

      <div className="reports__reports-list">
        <ReportsList />
      </div>
    </div>
  );
};

export default Reports;
