import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useGoalsStore = defineStore('goals', () => {
  const router = useRouter()

  const allGoals = ref([])
  const emojis = ref(['😁', '😭', '😎', '🤖', '😽', '🤩'])

  async function getAllGoals() {
    try {
      const response = await axios.get('http://localhost:8000/goals')
      allGoals.value = response.data.result.map(goal => ({
        ...goal,
        emoji: emojis.value[Math.floor(Math.random() * emojis.value.length)],
        optionsState: false
      }))
    } catch (error) {
      console.log(error)
    }
  }
  getAllGoals()

  const modalState = ref(false)

  const addNew = (() => {
    modalState.value = true
  })

  const closeModal = (() => {
    modalState.value = false
    editState.value = false
    goalTitle.value = ''
    goalDescription.value = ''
  })

  const goalTitle = ref('')
  const goalDescription = ref('')
  const newGoal = ref(null)

  async function addNewGoal() {
    if (goalTitle.value === '' || goalDescription.value === '') {
      window.alert('Title and description can not be empty')
    } else {
      try {
        const response = await axios.post('http://localhost:8000/creategoal', {
          title: goalTitle.value,
          description: goalDescription.value
        })
        newGoal.value = response.data.result
        modalState.value = false
        await getAllGoals()
        goalTitle.value = ''
        goalDescription.value = ''
      } catch (error) {
        console.log(error)
      }
    }
  }

  // Edit and delete functionality
  const editState = ref(false)
  const selectedGoal = ref(null)

  const changeEditState = ((goal) => {
    editState.value = true
    goalTitle.value = goal.title,
      goalDescription.value = goal.description,
      selectedGoal.value = goal
  })

  async function editGoal() {
    try {
      const response = await axios.post('http://localhost:8000/editgoal', {
        id: selectedGoal.value.id,
        title: goalTitle.value,
        description: goalDescription.value
      })
      if (response.data) {
        window.alert('Selected goal has been updated')
        location.reload()
      }
      await getAllGoals()
      editState.value = false
      goalTitle.value = ''
      goalDescription.value = ''
    } catch (error) {
      console.log(error)
    }
  }

  const showOptions = ((goal) => {
    goal.optionsState = !goal.optionsState
  })

  async function deleteGoal(goal) {
    try {
      const response = await axios.post('http://localhost:8000/deletegoal', {
        id: goal.id
      })
      if (response.data) {
        window.alert('Selected goal has been deleted')
        router.push('/')
      }
      await getAllGoals()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    allGoals,
    emojis,
    modalState,
    editState,
    selectedGoal,
    goalTitle,
    goalDescription,
    getAllGoals,
    changeEditState,
    editGoal,
    showOptions,
    addNew,
    closeModal,
    deleteGoal,
    addNewGoal
  };

})