import { Mark } from "@/type/route/Mark";

export function arraysHaveSameSequence(arr1: Mark[], arr2: Mark[]) {
  return arr1.every((item, index) => item.image === arr2[index].image);
}

export function isTransitMark(marks: Mark[], priority: number) {
  let conunt = 0;
  const clickedMark = marks.find((mark) => mark.priority === priority);

  if (!clickedMark) return 0;
  marks.forEach((mark) => {
    if (mark.image === clickedMark.image) conunt++;
  });

  return conunt;
}
