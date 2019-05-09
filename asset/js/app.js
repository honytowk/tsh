$(document).ready(function () {

    $.get("json/page1.json").done((page1) => {
        $.get("json/page1.json").done((page2) => {
            var data = page1.concat(page2);
            var table = $('#listing').DataTable({
                initComplete: function () {
                    var input = $('.dataTables_filter input').unbind();
                    self = this.api();
                    $searchButton = $('#searchButton').click(() => {
                        self.search(input.val()).draw();
                    });
                    $('#clearButton').click(() => {
                        input.val('');
                        $searchButton.click();
                    });

                },

                createdRow: function (rowElement, rowData) {
                    let rating = rowData.rating;
                    let $ratingTd = $(rowElement).find("td:nth-child(2)").empty();
                    for (let i = 0; i < rating; i++) {
                        $ratingTd.append('<i  class="poundRating poundRatingBlue">&pound;</i>');
                    }
                    for (let i = rating; i < 5; i++) {
                        $ratingTd.append('<i class="poundRating poundRatingWhite">&pound;</i>');
                    }

                },
                data: data,
                columnDefs: [
                    {"width": "50%"}
                ],
                columns: [{
                    data: "name",
                    title: "Suppiler"
                },
                    {
                        data: "rating",
                        title: "Pound Rating"
                    },
                    {
                        data: "reference",
                        title: "Reference"
                    },
                    {
                        data: "value",
                        title: "Value"
                    }
                ],
                language: {
                    paginate: {
                        next:
                            '<span><a class="paginate_button current"><i class="arrow rightArrow"></i></a></span>', // or '→'
                        previous:
                            '<span><a class="paginate_button current"><i class="arrow leftArrow"></i></a></span>' // or '←'
                    }
                },
                "autoWidth": true,
                "lengthChange": false,
                "bInfo": false,
                "pageLength": 5

            });
            table.on('click', 'tr', () => {
                const data = table.row(this).data();
                event.preventDefault();
                $(this).blur(); // Manually remove focus from clicked link.

                $("#nameModal").text(data.name);
                $("#ratingModal").text(data.rating);
                $("#referenceModal").text(data.reference);
                $("#valueModal").text(data.value);
                $("#popupModal").modal();
            });
            $('#searchButton').click((event) => {
                table.search($("#search").val()).draw();
                event.preventDefault();
            });
            $("#poundRating").change( function() {
                var selectedRating = $(this).children("option:selected").val();
                table.column(1).search(selectedRating).draw();
            });
            $('#clearButton').click(() => {
                table.search($("#search").val(''));

            });


        });


    });


});
