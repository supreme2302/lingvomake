export default {
  loadCourses(state, payload) {
	let res = [];
	if (payload !== null && payload.length !== 0) {
	  payload.forEach(curr => {
		res.push({
		  id: curr.id,
		  name: curr.name,
		  description: curr.description,
		  imgSrc: "https://images.all-free-download.com/images/graphiclarge/toefl_87030.jpg",
		  children: [],
		  type: "course"
		});
	  });
	  state.courses = res;
	} else {
	  state.courses = [];
	}
  },
}
