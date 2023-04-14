import "./GroupManagement.scss";
import data from "../../components/GroupCard/data.json";
import GroupCard from "../../components/GroupCard/GroupCard";
import useModal from "../../hooks/useModal";
import GroupModal from "../../components/Modal/GroupModal/GroupModal";

export default function GroupManagement() {
  
  const { openModal } = useModal();

  return (
    <section className="groupmanage">
      <div className="section-header">
        <p className="section-header-title">그룹 관리</p>
        <p className="section-header-description">학생 그룹을 관리해요</p>
      </div>
      <div className="group-mange-create">
        <button
          onClick={(e) => {
            openModal(<GroupModal title="그룹 추가" />);
          }}
        >
          + 그룹추가
        </button>
      </div>
      <div className="group-manage-bottom">
        {data?.groupList.map((d) => (
          <GroupCard
            id={d.id}
            name={d.name}
            type={d.type}
            numberOfMember={d.numberOfMember}
          />
        ))}
      </div>
    </section>
  );
}
