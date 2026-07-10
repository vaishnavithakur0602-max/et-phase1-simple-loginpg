import TopCommandBar from '../components/TopCommandBar';
import LeftIconRail from '../components/LeftIconRail';
import MainCanvas from '../components/MainCanvas';
import RightSlidePanel from '../components/RightSlidePanel';
import StatusTicker from '../components/StatusTicker';

function DashboardPage() {
  return (
    <div className="fixed inset-0 bg-bg-base flex flex-col overflow-hidden">
      <TopCommandBar />
      <div className="flex flex-1 pt-14 pb-7">
        <LeftIconRail />
        <div className="flex-1 ml-16 relative">
          <MainCanvas />
        </div>
        <RightSlidePanel />
      </div>
      <StatusTicker />
    </div>
  );
}

export default DashboardPage;
