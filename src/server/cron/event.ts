
import { api } from "~/utils/api";
import { db } from "../db";

async function anyLiveEvents() {
  try {
    const currentTime = new Date();

    const events = await db.event.findMany({
      where: {
        AND: {
          eventState: "PUBLISHED",
          startDateTime: {
            lte: currentTime
          },
        }
      },
    });
  } catch {

  }
}
