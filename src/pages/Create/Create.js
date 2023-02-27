import React, { useState } from "react";
import "./Create.scss";
import Question from "../../components/Create/Question/Question";
import Text from "../../components/common/Text/Text";
import Date from "../../components/common/Date/Date";
import Check from "../../components/common/Check/Check";
import Button from "../../components/Button/Button";
import { useMutation, useQuery } from "react-query";
import {
  createApplication,
  getApplication,
  updateApplication,
} from "../../utils/api/application";
import { useRecoilValue } from "recoil";
// import { userState } from "utils/atom/user";
import { useNavigate, useParams } from "react-router-dom";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import AdvancedSettingModal from "../../components/Modal/AdvancedSetting/AdvancedSettingModal";
import Toggle from "../../components/common/Toggle/Toggle";

const Create = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const user = useRecoilValue(userState);
  const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false);
  const [advancedSettingModalIsOpen, setAdvancedSettingModalOpen] =
    useState(false);

  const create = useMutation(createApplication, {
    onSuccess: () => {
      navigate("/");
    },
  });

  const update = useMutation(updateApplication, {
    onSuccess: () => {
      alert("성공!");
      navigate("/");
    },
  });

  const onClick = () => {
    if (mode == "create") {
      create.mutate({
        request: {
          ...request,
          questionList: [...questionList],
        },
      });
    } else if (mode == "update") {
      update.mutate({
        request: {
          ...request,
          questionList: [...questionList],
        },
      });
    }
  };

  // const button = () => {
  //   if (mode === "create") {
  //     return {
  //       text: "만들기",
  //       disabled: !user?.authority,
  //     };
  //   } else if (mode === "update") {
  //     return {
  //       text: data?.allowsUpdatingReply ? "수정하기" : "수정할 수 없어요",
  //       disabled: !data?.allowsUpdatingReply,
  //     };
  //   }
  // };

  const queryApplicationForm = useQuery(
    "queryApplicationForm",
    () => getApplication(18),
    {
      enabled: mode === "update",
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(data);
        setRequest({ ...data });
        setQuestionList([...data.questionList]);
      },
      onError: () => {},
    }
  );

  const [request, setRequest] = useState({
    emoji: "😎",
    isAlways: false,
    title: "",
    description: "",
    allowsDuplication: false,
    allowsUpdatingReply: false,
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

  return (
    <>
      <section className="create-section">
        <div className="create-header">
          <div className="create-header-top">
            <div className="create-header-left">
              <div className="create-header-left-emoji">
                <input
                  className="create-header-left-emoji-input emoji"
                  type="text"
                  name="emoji"
                  value={request?.emoji}
                  onClick={() => setEmojiPickerIsOpen(true)}
                  readOnly={true}
                />
                {emojiPickerIsOpen ? (
                  <EmojiPicker
                    onEmojiClick={emojiChange}
                    emojiStyle={EmojiStyle.NATIVE}
                    width="30vw"
                  />
                ) : (
                  <></>
                )}
              </div>
              <Text
                className="create-header-left-title"
                placeholder="제목"
                name="title"
                value={request?.title}
                onChange={handleChange}
              />
            </div>
            <div className="create-header-right-date-wrapper">
              <div className="create-header-right-date">
                <div className="create-header-right-date-top">
                  <span>기간</span>
                  <Date
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
                <div className="create-header-right-date-bottom">
                  <span>~</span>
                  <Date
                    isAlways={request?.isAlways}
                    handleDate={(d) => setRequest({ ...request, endDate: d })}
                  />
                </div>
              </div>
            </div>
          </div>
          <Text
            className="create-header-description"
            placeholder="설명"
            name="description"
            onChange={handleChange}
            value={request?.description}
          />
        </div>
        <div className="create-question-section">
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
            action={() => setAdvancedSettingModalOpen(true)}
          />
          <Button className="create-button" text="만들기" action={onClick} />
        </div>
      </section>
      <AdvancedSettingModal
        isOpen={advancedSettingModalIsOpen}
        data={advancedSettingModalData}
        closeModal={() => setAdvancedSettingModalOpen(false)}
        request={request}
      />
    </>
  );
};

export default Create;
