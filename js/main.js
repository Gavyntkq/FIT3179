document.addEventListener("DOMContentLoaded", () => {
  const charts = [
    {
      id: "chart-01",
      file: "charts/01-national-smoking-trend.json",
      name: "Chart 1: Long-term decline in smoking"
    },
    {
      id: "chart-02",
      file: "charts/02-age-gender-trends.json",
      name: "Chart 2: Smoking by age and sex"
    },
    {
      id: "chart-03",
      file: "charts/03-abs-age-sex.json",
      name: "Chart 3: Current smoking across age groups"
    },
    {
      id: "chart-04",
      file: "charts/04-state-smoking.json",
      name: "Chart 4: State and territory smoking"
    },
    {
      id: "chart-05",
      file: "charts/05-smoking-map.json",
      name: "Chart 5: Geographic smoking map"
    },
    {
      id: "chart-06",
      file: "charts/06-smoking-symbol-map.json",
      name: "Chart 6: Proportional symbol map"
    },
    {
      id: "chart-07",
      file: "charts/07-vaping-age-heatmap.json",
      name: "Chart 7: E-cigarette use across age groups"
    },
    {
      id: "chart-08",
      file: "charts/08-smoking-slope-chart.json",
      name: "Chart 8: Smoking changes by age group"
    },
    {
      id: "chart-09",
      file: "charts/09-smoking-cartogram.json",
      name: "Chart 9: Smoking prevalence cartogram"
    },
    {
      id: "chart-10",
      file: "charts/10-vaping-change-dumbbell.json",
      name: "Chart 10: Change in vaping by age group"
    },
    {
      id: "chart-11",
      file: "charts/11-vaping-policy-support-heatmap.json",
      name: "Chart 11: Support for vaping and nicotine controls"
    }
  ];

  async function loadChart(chart) {
    const container = document.getElementById(chart.id);

    if (!container) {
      console.error(`Chart container not found: ${chart.id}`);
      return;
    }

    try {
      container.textContent = `Loading ${chart.name}...`;

      const response = await fetch(chart.file);

      if (!response.ok) {
        throw new Error(
          `Could not load ${chart.file} (HTTP ${response.status})`
        );
      }

      const specification = await response.json();

      container.textContent = "";

      container.setAttribute("role", "img");
      container.setAttribute("aria-label", chart.name);

      await vegaEmbed(container, specification, {
        actions: true,
        renderer: "canvas",
        tooltip: { theme: "light" }
      });

      console.log(`Successfully loaded: ${chart.file}`);
    } catch (error) {
      console.error(`Error loading ${chart.name}:`, error);

      container.innerHTML = "";

      const message = document.createElement("p");
      message.className = "chart-error";
      message.textContent =
        `${chart.name} could not be displayed. Please refresh the page; if the problem continues, check the chart file path and browser console.`;

      container.appendChild(message);
    }
  }

  if (
    typeof vegaEmbed === "undefined" ||
    typeof vegaLite === "undefined" ||
    typeof vega === "undefined"
  ) {
    console.error(
      "Vega libraries did not load. Check your internet connection."
    );
    return;
  }

  charts.forEach(loadChart);
});
