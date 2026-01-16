import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 초기 샘플 데이터 10개 이상
const initialTasks = [
  {
    id: '1',
    title: '프로젝트 기획서 작성',
    description: '새로운 프로젝트의 전체 기획서를 작성합니다.',
    priority: 'High',
    status: 'todo',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    title: 'UI/UX 디자인 초안',
    description: '메인 페이지의 UI/UX 디자인 초안을 완성합니다.',
    priority: 'High',
    status: 'todo',
    createdAt: new Date('2024-01-16').toISOString(),
  },
  {
    id: '3',
    title: '데이터베이스 스키마 설계',
    description: '프로젝트에 필요한 데이터베이스 스키마를 설계합니다.',
    priority: 'High',
    status: 'inProgress',
    createdAt: new Date('2024-01-14').toISOString(),
  },
  {
    id: '4',
    title: 'API 엔드포인트 개발',
    description: '사용자 인증 및 데이터 조회 API를 개발합니다.',
    priority: 'High',
    status: 'inProgress',
    createdAt: new Date('2024-01-13').toISOString(),
  },
  {
    id: '5',
    title: '프론트엔드 컴포넌트 개발',
    description: 'React 컴포넌트를 개발하고 스타일링을 완료합니다.',
    priority: 'Medium',
    status: 'inProgress',
    createdAt: new Date('2024-01-12').toISOString(),
  },
  {
    id: '6',
    title: '테스트 코드 작성',
    description: '단위 테스트 및 통합 테스트 코드를 작성합니다.',
    priority: 'Medium',
    status: 'todo',
    createdAt: new Date('2024-01-11').toISOString(),
  },
  {
    id: '7',
    title: '문서화 작업',
    description: '프로젝트 문서 및 API 문서를 작성합니다.',
    priority: 'Low',
    status: 'todo',
    createdAt: new Date('2024-01-10').toISOString(),
  },
  {
    id: '8',
    title: '코드 리뷰',
    description: '팀원들의 코드를 리뷰하고 피드백을 제공합니다.',
    priority: 'Medium',
    status: 'done',
    createdAt: new Date('2024-01-09').toISOString(),
  },
  {
    id: '9',
    title: '버그 수정',
    description: '발견된 버그들을 수정하고 테스트합니다.',
    priority: 'High',
    status: 'done',
    createdAt: new Date('2024-01-08').toISOString(),
  },
  {
    id: '10',
    title: '성능 최적화',
    description: '애플리케이션의 성능을 최적화합니다.',
    priority: 'Medium',
    status: 'done',
    createdAt: new Date('2024-01-07').toISOString(),
  },
  {
    id: '11',
    title: '배포 준비',
    description: '프로덕션 환경 배포를 위한 준비 작업을 완료합니다.',
    priority: 'High',
    status: 'done',
    createdAt: new Date('2024-01-06').toISOString(),
  },
  {
    id: '12',
    title: '사용자 피드백 수집',
    description: '베타 테스터들의 피드백을 수집하고 분석합니다.',
    priority: 'Low',
    status: 'done',
    createdAt: new Date('2024-01-05').toISOString(),
  },
];

export const useTaskStore = create(
  persist(
    (set) => ({
      tasks: initialTasks,

      // 태스크 추가
      addTask: (task) => {
        const newTask = {
          id: Date.now().toString(),
          title: task.title,
          description: task.description || '',
          priority: task.priority,
          status: 'todo',
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },

      // 태스크 상태 변경 (드래그 앤 드롭)
      updateTaskStatus: (taskId, newStatus) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          ),
        }));
      },

      // 태스크 삭제
      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
      },

      // 태스크 수정
      updateTask: (taskId, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        }));
      },
    }),
    {
      name: 'kanban-tasks-storage',
      // localStorage에 데이터가 없을 때만 초기 데이터 사용
      merge: (persistedState, currentState) => {
        // localStorage에 저장된 데이터가 있으면 그것을 사용
        if (persistedState && persistedState.tasks && persistedState.tasks.length > 0) {
          return { ...currentState, ...persistedState };
        }
        // 없으면 초기 데이터 사용
        return { ...currentState, tasks: initialTasks };
      },
    }
  )
);
