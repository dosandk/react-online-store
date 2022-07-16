export const createElement = (portalId, className) => {
  const element = document.getElementById(portalId);

  if (element) {
    return element;
  }

  const container = document.createElement("div");

  container.setAttribute("id", portalId);
  container.className = className;

  document.body.append(container);

  return container;
};
