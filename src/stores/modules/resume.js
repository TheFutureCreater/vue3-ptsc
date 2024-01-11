import { defineStore } from 'pinia'
import { ref } from 'vue'

// 简历信息
export const useResumeStore = defineStore('ptsc-resume-condition', () => {
  const resumeData = ref({
    resume: {
      phoneNum: '19873401936',
      email: '',
      addressId: 0,
      realName: 'Jack',
      realAvatar: "http://dummyimage.com/'200x200'/c2f279&text=He",
      sex: 1,
      birthday: '1974-11',
      jobSeek: 1,
      politics: 1,
      address: '',
      resumeId: 1,
      resumeName: '新建简历1',
      natrue: 2,
      note: ''
    },
    desire: [
      {
        desireId: 2,
        desireJob: '',
        desireRegion: 12,
        minWages: 6,
        maxWages: 16,
        address: ''
      }
    ],
    education: [
      {
        educationId: 0,
        background: 3,
        schoolName: '',
        majorName: '',
        enrollTime: '2004-06',
        graduateTime: '2008-05',
        studyAbroad: 0,
        note: ''
      }
    ],
    occupation: [
      {
        occupationId: 0,
        mercName: '',
        job: '',
        business: 3,
        entryTime: '2007-08',
        quitTime: '1979-02',
        note: ''
      }
    ],
    organization: [
      {
        organizationId: 0,
        orgName: '',
        role: '',
        entryTime: '1974-08',
        quitTime: '1984-08',
        note: ''
      }
    ],
    project: [
      {
        projectId: 0,
        proName: '是较精通',
        entryTime: '2010-09',
        quitTime: '2015-06',
        note: '放表手部毛往华种火程到过料北。大济千华造难此论后多路石以。除风格土集力治周过华准飞转。厂次美少将后政路越集边军地政影。'
      },
      {
        projectId: 0,
        proName: '观当照步元调',
        entryTime: '2012-04',
        quitTime: '1981-03',
        note: '目是非种斗感军先酸声你二收小。细边可素入真行题民该土至西易却原。按七难它名量需决无九习统立比万府议。'
      }
    ],
    skill: [
      {
        languageId: 0,
        skill: 100,
        mastery: 2
      }
    ],
    work: [
      {
        workId: 0,
        workName: '',
        url: '',
        note: ''
      }
    ],
    credential: [
      {
        credentialId: 13,
        creName: ''
      }
    ]
  })

  return {
    resumeData
  }
})
