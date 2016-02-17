function check() {
  if ($(".table_buttons").hasClass("matrix_A")) {
    var tableID = ('matrix_A');
  } else if ($(".table_buttons").hasClass("matrix_B")) {
    var tableID = ('matrix_B');
  }
  return tableID;
}

function addRow() {
  var table = document.getElementById(check());
  var rowCount = table.rows.length;
  if (rowCount < 10) {
    var row = table.insertRow(rowCount);
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      var cell = row.insertCell();
      var element = document.createElement("input");
      element.type = "number";
      cell.appendChild(element);
    }
  }
}

function deleteRow() {
  var table = document.getElementById(check());
  if (table.rows.length > 2) {
    table.deleteRow(-1);
  }
}

function addCol() {
  var table = document.getElementById(check());
  if (table.rows[0].cells.length < 10) {
    for (var i = 0; i < table.rows.length; i++) {
      var cell = table.rows[i].insertCell(-1);
      var element = document.createElement("input");
      element.type = "number";
      cell.appendChild(element);
    }
  }
}

function deleteCol() {
  var table = document.getElementById(check());
  if (table.rows[0].cells.length > 2) {
    for (var i = table.rows.length - 1; i >= 0; i--) {
      table.rows[i].deleteCell(-1);
    }
  }
}

$(document).ready(function() {
  $('input[id="check_A"]').click(function() {
    if ($(this).is(":checked")) {
      $('.table_buttons').addClass("matrix_A");
      $('.table_buttons').removeClass("matrix_B");
    }
  });
});
$(document).ready(function() {
  $('input[id="check_B"]').click(function() {
    if ($(this).is(":checked")) {
      $('.table_buttons').addClass("matrix_B");
      $('.table_buttons').removeClass("matrix_A");
    }
  });
});

function addMatrixC(a) {
  var table = document.getElementById('matrix_C');
  //  var tbody = document.getElementById('mc');
  var rowsA = a.length;
  var colsA = a[0].length;
  for (i = 0; i < rowsA; i++) {
    var vals = a[i];
    var row = document.createElement('tr');
    for (var b = 0; b < colsA; b++) {
      var cell = document.createElement('td');
      cell.textContent = vals[b];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  //    table.appendChild(tbody);
}

function readMatrix(tableID) {
  var $matrixA = $(tableID);
  var $trs = $matrixA.find('tr');
  var A = [];
  $trs.each(function(i) {
    A.push([]);
    $(this).find('input').each(function() {
      var val = $(this).val();
      A[i].push(val);
    });
  });
  return A;
}

function canMultiply(A, B) {
  return A[0].length === B.length;
}

function multiplyMatrix() {
  var A = readMatrix('#matrix_A');
  var B = readMatrix('#matrix_B');
  if (!canMultiply(A, B)) {
    $(document).ready(function() {
      $('.left').css("background-color", "rgba(245, 130, 130, 0.5)");
      $('.cantMultiply').append('<p>Такие матрицы нельзя перемножить,<br>так как количество столбцов матрицы А<br>не равно количеству строк матрицы B.<p>');
    });
    return;
  }
  var C = math.multiply(A, B);
  addMatrixC(C);
}
$(document).ready(function() {
  $("td").keydown(function() {
    $(".left").css("background-color", "rgba(81, 147, 232, 1)");
    $('.cantMultiply').empty();
  });
});

function clean() {
  $(document).ready(function() {
    $("input").val("");
  });
}

$(document).ready(function() {
  $("input").keyup(function() {
    var $value = this.value
    if ($value > 10) {
      $value = 10;
    };
    if ($value < 0) {
      $value = 0;
    };
    this.value = $value;
  });
});
