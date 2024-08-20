(function ($) {
    "use strict";

    // document.addEventListener("DOMContentLoaded", function () {
    //     var autoLabelButton = document.getElementById("btn-video_upload");
    //     if (autoLabelButton) {
    //         autoLabelButton.addEventListener("click", function () {
    //             autoLabelButton.disabled = true;

    //             update_Rss_Feed_with_AI();

    //             setTimeout(function () {
    //                 autoLabelButton.disabled = false;
    //             }, 5000); // 5000ms = 5s
    //         });
    //         // autoLabelButton.disabled = false;
    //     }
    // });

    document.addEventListener("DOMContentLoaded", function () {
        var autoLabelButton = document.getElementById("save-company-details-btn");
        if (autoLabelButton) {
            autoLabelButton.addEventListener("click", function () {
                company_detail_edit();
            });
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        var autoLabelButton = document.getElementById("create_post-btn");
        if (autoLabelButton) {
            autoLabelButton.addEventListener("click", function () {
                create_social_media_post();
            });
        }
    });


    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });


    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#000000";


    // Data Chart
    document.addEventListener("DOMContentLoaded", function () {
        var ctx1 = $("#data-chart").get(0);
        if (ctx1) {
            var ctx1 = ctx1.getContext("2d");
            var myChart1 = new Chart(ctx1, {
                type: "bar",
                data: {
                    labels: ["Total", "Labeled", "Unlabeled"],
                    datasets: [
                        {
                            label: "Data",
                            data: [
                                window.chartData[0].data[0],
                                window.chartData[1].data[0],
                                window.chartData[2].data[0]
                            ],
                            backgroundColor: [
                                window.chartData[0].color,
                                window.chartData[1].color,
                                window.chartData[2].color
                            ]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grid: {
                                display: true
                            }
                        }
                    }
                }
            });
        }
    });


    // Sales & Revenue Chart
    function createLabels(length) {
        var labels = [];
        for (var i = 1; i <= length; i++) {
            labels.push(i);
        }
        return labels;
    }



    document.addEventListener("DOMContentLoaded", function () {

        var ctx2 = $("#ml-scores").get(0);
        if (ctx2){
            var ctx2 = ctx2.getContext("2d");
            var length = Math.max(window.mlScores.accuracy.length, window.mlScores.precision.length, window.mlScores.recall.length);
            var labels = createLabels(length);

            var myChart2 = new Chart(ctx2, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Accuracy",
                        data: window.mlScores.accuracy,
                        backgroundColor: "rgba(255, 0, 0, 0.2)",
                        borderColor: "rgba(255, 0, 0, 1)",
                        borderWidth: 1,
                        fill: true
                    },
                    {
                        label: "Precision",
                        data: window.mlScores.precision,
                        backgroundColor: "rgba(0, 0, 255, 0.2)",
                        borderColor: "rgba(0, 0, 255, 1)",
                        borderWidth: 1,
                        fill: true
                    },
                    {
                        label: "Recall",
                        data: window.mlScores.recall,
                        backgroundColor: "rgba(0, 255, 0, 0.2)",
                        borderColor: "rgba(0, 255, 0, 1)",
                        borderWidth: 1,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        // Single Line Chart
        var ctx3 = $("#line-chart").get(0);
        if (ctx3){
            var ctx3 = ctx3.getContext("2d");
            var myChart3 = new Chart(ctx3, {
                type: "line",
                data: {
                    labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
                    datasets: [{
                        label: "Sales",
                        fill: false,
                        backgroundColor: "rgba(235, 22, 22, .7)",
                        data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }
    });


    document.addEventListener("DOMContentLoaded", function () {
        // Single Bar Chart
        var ctx4 = $("#bar-chart").get(0);
        if (ctx4){
            var ctx4 = ctx4.getContext("2d");
            var myChart4 = new Chart(ctx4, {
                type: "bar",
                data: {
                    labels: ["Italy", "France", "Spain", "USA", "Argentina"],
                    datasets: [{
                        backgroundColor: [
                            "rgba(235, 22, 22, .7)",
                            "rgba(235, 22, 22, .6)",
                            "rgba(235, 22, 22, .5)",
                            "rgba(235, 22, 22, .4)",
                            "rgba(235, 22, 22, .3)"
                        ],
                        data: [55, 49, 44, 24, 15]
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }
    });


    document.addEventListener("DOMContentLoaded", function () {
        // Pie Chart
        var ctx5 = $("#pie-chart").get(0);
        if (ctx5) {
            var ctx5 = ctx5.getContext("2d");
            var myChart5 = new Chart(ctx5, {
                type: "pie",
                data: {
                    labels: ["Italy", "France", "Spain", "USA", "Argentina"],
                    datasets: [{
                        backgroundColor: [
                            "rgba(235, 22, 22, .7)",
                            "rgba(235, 22, 22, .6)",
                            "rgba(235, 22, 22, .5)",
                            "rgba(235, 22, 22, .4)",
                            "rgba(235, 22, 22, .3)"
                        ],
                        data: [55, 49, 44, 24, 15]
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }
    });


    document.addEventListener("DOMContentLoaded", function () {
        // Doughnut Chart
        var ctx6 = $("#doughnut-chart").get(0);
        if (ctx6){
            var ctx6 = ctx6.getContext("2d");
            var myChart6 = new Chart(ctx6, {
                type: "doughnut",
                data: {
                    labels: ["Italy", "France", "Spain", "USA", "Argentina"],
                    datasets: [{
                        backgroundColor: [
                            "rgba(235, 22, 22, .7)",
                            "rgba(235, 22, 22, .6)",
                            "rgba(235, 22, 22, .5)",
                            "rgba(235, 22, 22, .4)",
                            "rgba(235, 22, 22, .3)"
                        ],
                        data: [55, 49, 44, 24, 15]
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }
    });


})(jQuery);

