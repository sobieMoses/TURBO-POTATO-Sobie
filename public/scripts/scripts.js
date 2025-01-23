$( document).ready(function() {

    loadFoodsData("foodList");
  
    addEvents();
  
  });
  
  function loadFoodsData(appendId) {
    let appendElement = $(`#${appendId}`);
    appendElement.empty();
  
    $.each(data.foods, (index, food)=>{
  
    appendElement.append(`
      <li id="foodNo${index}Name" class="list-group-item mb-2 foodName">
        ${food.name}
  
        <ul class="list-group foodDetails">
          <li class="input-group w-100">
            <span class="w-20 input-group-text">rating</span>
             <input id="foodNo${index}ratingEdit" name="rating" type="text" class="form-control editFood" value="${food.rating}">
          </li>
        <li class="input-group w-100">
              <span class="w-20 input-group-text">recipeURL</span>
                <input id="foodNo${index}RecipeURLEdit" type="text" name="recipeURL" 
                class="form-control editFood" value="${food.recipeURL}">
            </li>
        <li class="input-group w-100">
              <span class="w-20 input-group-text">tags</span>
                <input id="foodNo${index}TagsEdit" type="text" name="tags" 
                class="form-control editFood" value="${food.tags}">
           
            </li>
          </ul>
        </li>`);
  
        $('.foodDetails').hide();
        $('input.editFood').prop('readonly', true);
    });
  
  }
  
  function addEvents(){
      // This will toggle the visibility of game details when clicked.
      $('.foodName').on('click', (e) => {
  
        let $this = $(e.target);
        let $thisId = $this.attr('id');
    
        $('#' + $thisId + ' > ul.foodDetails').toggle();
      });
    
      // Hides all gameDetail sections.
      $('#btnHideAll').on('click', (e) => {
    
        $('ul.foodDetails').hide();
    
      });
    
      // Shows all gameDetail sections.
      $('#btnShowAll').on('click', (e) => {
    
        $('ul.foodDetails').show();
    
      });
    
      // Makes input fields editiable when clicked on.
      $('input.editFoods').on('click', (e) => {
    
        let $this = $(e.target);
        $this.prop('readonly', false);
    
      })
  
      $('#btnSaveFoods').on('click', ()=>{
  
        data.foods.push({ 
          name : $('#foodAddName').val(), 
          rating : $('#foodAddRating').val(),
          recipeURL : $('#foodAddRecipeURL').val(), 
          tags: $('#foodAddTags').val(),
        
        }); 
  
        loadFoodData("foodList");
      addEvents(); 
  
      $('#addFoodModal .btn-close').click() 
      $('#addFoodModal input').val(''); 
      
  
    });
  
    $('input.editFood').on('blur', (e)=> {
  
      let $this = $(e.target); 
      let $thisId = $this.attr('id'); 
      let $thisKey = $this.attr('name');
       console.log($thisKey); 
   
      let regexDigit = /\d+/g;
      let foodIndex = $thisId.match(regexDigit)[0]; 
  
  
      data.foods[foodIndex][$thisKey] = $this.val(); 
  
      $(e.target).prop('readonly', true); 
       
    }); 
  
  
    $('#btnConsoleData').on('click', ()=>{
  
      console.log(data.foods); 
  
    })
  
  }