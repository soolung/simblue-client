import React, { useState } from "react";
import "./Form.scss";
import Question from "../../components/Create/Question/Question";
import Text from "../../components/common/Text/Text";
import DateBox from "../../components/common/Date/DateBox";
import Check from "../../components/common/Check/Check";
import Button from "../../components/Button/Button";
import { useMutation, useQuery } from "react-query";
import { createApplicationForm, getApplicationForm, updateApplicationForm, } from "../../utils/api/application";
import { useNavigate, useParams } from "react-router-dom";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import AdvancedSettingModal from "../../components/Modal/AdvancedSetting/AdvancedSettingModal";
import Toggle from "../../components/common/Toggle/Toggle";
import Loading from "../../components/common/Loading/Loading";
import { now } from "../../utils/etc/DateTimeFormatter";
import { useUser } from '../../hooks/useUser';

const Form = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false);
  const [advancedSettingModalIsOpen, setAdvancedSettingModalOpen] = useState(false);
  const create = useMutation(createApplicationForm, {
    onSuccess: () => {
      navigate("/");
    },
  });

  const update = useMutation(updateApplicationForm, {
    onSuccess: () => {
      alert("성공!");
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const form = useQuery(
    "queryApplicationForm",
    () => getApplicationForm(id),
    {
      enabled: mode === "update",
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setRequest({ ...data });
        setQuestionList([...data.questionList]);
        setOwnerList([...data.ownerList]);
        setOwnerIdSet(new Set([...data.ownerList.map(d => d.teacherId), parseInt(user.roleId)]));
      },
    }
  );

  const onClick = () => {
    if (mode === "create") {
      create.mutate({
        request: {
          ...request,
          questionList: [...questionList],
          ownerList: Array.from(ownerList)
        },
      });
    } else if (mode === "update" && form.data?.canUpdate) {
      update.mutate({
        id: id,
        request: {
          ...request,
          questionList: [...questionList],
          ownerList: Array.from(ownerList)
        },
      });
    }
  };

  const button = () => {
    if (mode === "create") {
      return {
        text: "만들기",
        disabled: !user.authority === "ROLE_TEACHER",
      };
    } else if (mode === "update") {
      return {
        text: form.data?.canUpdate ? "수정하기" : "수정할 수 없습니다",
        disabled: !user.authority === "ROLE_TEACHER" || !form.data?.canUpdate,
      };
    }
  };

  const [request, setRequest] = useState({
    emoji: "😎",
    isAlways: false,
    title: "",
    description: "",
    allowsDuplication: false,
    allowsUpdatingReply: false,
    startDate: now(),
    endDate: now(),
  });

  const advancedSettingModalData = [
    {
      name: "중복 허용",
      setting: (
        <Toggle
          value={request.allowsDuplication}
          onClick={() => {
            setRequest({
              ...request,
              allowsDuplication: !request.allowsDuplication,
            });
          }}
        />
      ),
    },
    {
      name: "답변 수정 허용",
      setting: (
        <Toggle
          value={request.allowsUpdatingReply}
          onClick={() => {
            setRequest({
              ...request,
              allowsUpdatingReply: !request.allowsUpdatingReply,
            });
          }}
        />
      ),
    },
  ];

  const [questionList, setQuestionList] = useState([
    {
      type: "TEXT",
      question: "",
      answerList: [
        {
          answer: "",
        },
      ],
      isRequired: true,
      description: "",
    },
  ]);

  const handleChange = (e) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };

  const emojiChange = (e) => {
    setRequest({
      ...request,
      emoji: e.emoji,
    });

    setEmojiPickerIsOpen(false);
  };

  const handleQuestionChange = (e, index) => {
    setQuestionList(
      [...questionList],
      (questionList[index][e.target.name] = e.target.value)
    );
  };

  const toggleIsRequired = (index) => {
    setQuestionList(
      [...questionList],
      (questionList[index].isRequired = !questionList[index].isRequired)
    );
  };

  const addAnswer = (index) => {
    setQuestionList(
      [...questionList],
      (questionList[index].answerList = [
        ...questionList[index].answerList,
        {
          answer: "",
        },
      ])
    );
  };

  const addNextAnswer = (answerIndex, index) => {
    const newAnswerList = questionList[index].answerList;
    if (newAnswerList.length - 1 === answerIndex) {
      newAnswerList.push({ answer: "" });
    } else {
      newAnswerList.splice(answerIndex + 1, 0, {
        answer: "",
      });
    }
    setQuestionList(
      [...questionList],
      (questionList[index].answerList = [...newAnswerList])
    );
  };

  const handleAnswer = (a, questionIndex, answerIndex) => {
    setQuestionList(
      [...questionList],
      (questionList[questionIndex].answerList[answerIndex].answer = a)
    );
  };

  const addQuestion = () => {
    setQuestionList([
      ...questionList,
      {
        type: "TEXT",
        question: "",
        answerList: [
          {
            answer: "",
          },
        ],
        isRequired: true,
        description: "",
      },
    ]);
  };

  const deleteAnswer = (target, questionIndex) => {
    setQuestionList(
      [...questionList],
      (questionList[questionIndex].answerList = questionList[
        questionIndex
        ].answerList.filter((a, index) => target !== index))
    );
  };

  const deleteQuestion = (target) => {
    setQuestionList(questionList.filter((q, index) => target !== index));
  };

  const copyQuestion = (index) => {
    const newQuestionList = [...questionList];
    newQuestionList.splice(
      index + 1,
      0,
      JSON.parse(JSON.stringify(questionList[index]))
    );
    setQuestionList(newQuestionList);
  };

  const [ownerList, setOwnerList] = useState([]);
  const [ownerIdSet, setOwnerIdSet] = useState(new Set([parseInt(user.roleId)]));

  const addOwner = ({ teacherId, name }) => {
    if (!ownerIdSet.has(teacherId)) {
      setOwnerList(
        [...ownerList, {
          teacherId: teacherId,
          name: name
        }])

      ownerIdSet.add(teacherId);
    }
  }

  const deleteOwner = (teacherId) => {
    if (ownerIdSet.has(teacherId)) {
      setOwnerList(ownerList.filter((o) => teacherId !== o.teacherId));
      ownerIdSet.delete(teacherId);
    }
  }

  return form.isLoading ? (
    <Loading />
  ) : (
    <>
      <section className="form-section">
        <div className="form-header">
          <div className="form-header-top">
            <div className="form-header-left">
              <div className="form-header-left-emoji">
                <input
                  className="form-header-left-emoji-input emoji"
                  type="text"
                  name="emoji"
                  value={request?.emoji}
                  onClick={() => setEmojiPickerIsOpen(true)}
                  readOnly={true}
                />
                {emojiPickerIsOpen && (
                  <EmojiPicker
                    onEmojiClick={emojiChange}
                    emojiStyle={EmojiStyle.NATIVE}
                    width="30vw"
                  />
                )}
              </div>
              <Text
                className="form-header-left-title"
                placeholder="제목"
                name="title"
                value={request?.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-header-right-date-wrapper">
              <div className="form-header-right-date">
                <div className="form-header-right-date-top">
                  <span>기간</span>
                  <DateBox
                    initialDate={request?.startDate ?? now()}
                    isAlways={request?.isAlways}
                    handleDate={(d) => setRequest({ ...request, startDate: d })}
                  />
                  <Check
                    labelClassName="always-label"
                    className="always-button"
                    label="상시"
                    isChecked={request?.isAlways}
                    onChange={() =>
                      setRequest({ ...request, isAlways: !request?.isAlways })
                    }
                  />
                </div>
                <div className="form-header-right-date-bottom">
                  <span>~</span>
                  <DateBox
                    initialDate={request?.endDate ?? now()}
                    isAlways={request?.isAlways}
                    handleDate={(d) => setRequest({ ...request, endDate: d })}
                  />
                </div>
              </div>
            </div>
          </div>
          <Text
            className="form-header-description"
            placeholder="설명"
            name="description"
            onChange={handleChange}
            value={request?.description}
          />
        </div>
        <div className="form-question-section">
          {questionList?.map((q, index) => (
            <Question
              question={q}
              handleQuestionChange={handleQuestionChange}
              deleteQuestion={deleteQuestion}
              key={index}
              index={index}
              addAnswer={addAnswer}
              addNextAnswer={addNextAnswer}
              handleAnswer={handleAnswer}
              deleteAnswer={deleteAnswer}
              toggleIsRequired={toggleIsRequired}
              copyQuestion={copyQuestion}
            />
          ))}
          <button className="add-question-button" onClick={addQuestion}>
            <span>+</span>
          </button>
        </div>
        <div className="button-area">
          <Button
            className="advanced-setting-button"
            text="고급 설정"
            onClick={() => setAdvancedSettingModalOpen(true)}
          />
          <Button
            className="form-button"
            text={button().text}
            disabled={button().disabled}
            onClick={onClick}
          />
        </div>
      </section>
      <AdvancedSettingModal
        id={id}
        mode={mode}
        isOpen={advancedSettingModalIsOpen}
        data={advancedSettingModalData}
        closeModal={() => setAdvancedSettingModalOpen(false)}
        request={request}
        ownerList={ownerList}
        addOwner={addOwner}
        deleteOwner={deleteOwner}
      />
    </>
  );
};

export default Form;
