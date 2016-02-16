function proverka(input) {
var num = parseFloat (document.getElementById ('input_id').value);
if (num >= 1 && num <= 20);
else document.getElementById('input_id').value = '';
}

/////////////////////////////////
function test() {
  $matrixA = $('#matrix_A');
  var $trs = $matrixA.find('tr');
  var A = [];
  $trs.each(function(i){
    A.push([]);
    $(this).find('input').each(function(){
      var val = $(this).val();
      A[i].push(val);
    });
  });
  test1(A);
}
