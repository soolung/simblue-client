import './GroupManagement.scss';

export default function GroupManagement(){
    return(
        <section className="groupmanage">
        <div className="section-header">
          <p className="section-header-title">그룹 관리</p>
          <p className="section-header-description">학생 그룹을 관리해요</p>
        </div>
        <div className="group-mange-create">
        <button
        //   onClick={(e) => {
        //     e.preventDefault();
        //     openModal(<BannerMaker title="배너 등록" />);
        //   }}
        >
          + 그룹추가
        </button>
      </div>
      </section>
    )
}