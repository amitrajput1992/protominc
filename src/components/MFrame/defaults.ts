import { CanvasTexture, Color } from "three";

export default {
  container: null,
  fontFamily: null,
  fontSize: 0.05,
  fontKerning: "normal", // FontKerning would act like css : "none"|"normal"|"auto"("auto" not yet implemented)
  offset: 0.01,
  interLine: 0.01,
  breakOn: "- ,.:?!",
  contentDirection: "column",
  alignContent: "center",
  justifyContent: "start",
  fontTexture: null,
  textType: "MSDF",
  fontColor: new Color(0xffffff),
  fontOpacity: 1,
  borderRadius: 0.01,
  borderWidth: 0,
  borderColor: new Color("black"),
  backgroundSize: "cover",
  backgroundColor: new Color(0x222222),
  backgroundWhiteColor: new Color(0xffffff),
  backgroundOpacity: 0.8,
  backgroundOpaqueOpacity: 1.0,
  backgroundTexture: DefaultBackgroundTexture(),
  hiddenOverflow: false,
  letterSpacing: 0,
  borderOpacity: 0,
  padding: 0
};

function DefaultBackgroundTexture() {
  const ctx = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D;
  ctx.canvas.width = 1;
  ctx.canvas.height = 1;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 1, 1);
  return new CanvasTexture(ctx.canvas);
}