import { D1PreparedStatement } from "@cloudflare/workers-types";
import { WebhooksOpts } from "./context.ts";

type TbaBool = "Yes" | "No";
type TbaEndGame = "None" | "Parked" | "ShallowCage" | "DeepCage";
type TbaAllianceScore = {
  autoLineRobot1: TbaBool;
  autoLineRobot2: TbaBool;
  autoLineRobot3: TbaBool;
  endGameRobot1: TbaEndGame;
  endGameRobot2: TbaEndGame;
  endGameRobot3: TbaEndGame;
  wallAlgaeCount: number;
};
type TbaRequest =
  | {
      message_type: "verification";
      message_data: {
        verification_key: string;
      };
    }
  | {
      message_type: "ping";
      message_data: {
        title: string;
        desc: string;
      };
    }
  | {
      message_type: "match_score";
      message_data: {
        match: {
          eventKey: string;
          comp_level: "qm" | "ef" | "qf" | "sf" | "f";
          match_number: number;
          score_breakdown: {
            red: TbaAllianceScore;
            blue: TbaAllianceScore;
          };
        };
      };
    };
export const tba = async (opts: WebhooksOpts): Promise<Response> => {
  const body: TbaRequest = JSON.parse(await opts.request.text());
  switch (body.message_type) {
    case "verification": {
      opts.env.KV.put(
        "tba-verification-key",
        body.message_data.verification_key
      );
      console.log(body.message_data.verification_key);
      return new Response("Verification token received.");
    }
    case "ping": {
      console.log("TBA Ping");
      return new Response("Ping successful.");
    }
    case "match_score": {
      if (body.message_data.match.score_breakdown.red.autoLineRobot1) {
        const updateTeamMatchEntry = opts.env.DB.prepare(
          `UPDATE TeamMatchEntry
            SET tbaAutoLine = ?,
              tbaEndgamePark = ?,
              tbaEndgameShallow = ?,
              tbaEndgameDeep = ?
            WHERE eventKey = ?
              AND matchLevel = ?
              AND matchNumber = ?
              AND alliance = ?
              AND robotNumber = ?;`
        );
        const updateHumanPlayerEntry = opts.env.DB.prepare(
          `UPDATE HumanPlayerEntry
            SET tbaMaxAlgaeAttempts = ?
            WHERE eventKey = ?
              AND matchLevel = ?
              AND matchNumber = ?
              AND alliance = ?
              AND robotNumber = 4;`
        );
        const boundStmts: D1PreparedStatement[] = [];

        console.log(body.message_data.match);
        boundStmts.push(
          updateTeamMatchEntry.bind(
            body.message_data.match.score_breakdown.red.autoLineRobot1 ===
              "Yes",
            body.message_data.match.score_breakdown.red.endGameRobot1 ===
              "Parked",
            body.message_data.match.score_breakdown.red.endGameRobot1 ===
              "ShallowCage",
            body.message_data.match.score_breakdown.red.endGameRobot1 ===
              "DeepCage",
            body.message_data.match.eventKey,
            {
              qm: "Qualification",
              ef: "Playoff",
              qf: "Playoff",
              sf: "Playoff",
              f: "Playoff",
            }[body.message_data.match.comp_level],
            body.message_data.match.match_number,
            "Red",
            1
          )
        );
        boundStmts.push(
          updateTeamMatchEntry.bind(
            body.message_data.match.score_breakdown.red.autoLineRobot2 ===
              "Yes",
            body.message_data.match.score_breakdown.red.endGameRobot2 ===
              "Parked",
            body.message_data.match.score_breakdown.red.endGameRobot2 ===
              "ShallowCage",
            body.message_data.match.score_breakdown.red.endGameRobot2 ===
              "DeepCage",
            body.message_data.match.eventKey,
            {
              qm: "Qualification",
              ef: "Playoff",
              qf: "Playoff",
              sf: "Playoff",
              f: "Playoff",
            }[body.message_data.match.comp_level],
            body.message_data.match.match_number,
            "Red",
            2
          )
        );
        boundStmts.push(
          updateTeamMatchEntry.bind(
            body.message_data.match.score_breakdown.red.autoLineRobot3 ===
              "Yes",
            body.message_data.match.score_breakdown.red.endGameRobot3 ===
              "Parked",
            body.message_data.match.score_breakdown.red.endGameRobot3 ===
              "ShallowCage",
            body.message_data.match.score_breakdown.red.endGameRobot3 ===
              "DeepCage",
            body.message_data.match.eventKey,
            {
              qm: "Qualification",
              ef: "Playoff",
              qf: "Playoff",
              sf: "Playoff",
              f: "Playoff",
            }[body.message_data.match.comp_level],
            body.message_data.match.match_number,
            "Red",
            3
          )
        );
        boundStmts.push(
          updateTeamMatchEntry.bind(
            body.message_data.match.score_breakdown.blue.autoLineRobot1 ===
              "Yes",
            body.message_data.match.score_breakdown.blue.endGameRobot1 ===
              "Parked",
            body.message_data.match.score_breakdown.blue.endGameRobot1 ===
              "ShallowCage",
            body.message_data.match.score_breakdown.blue.endGameRobot1 ===
              "DeepCage",
            body.message_data.match.eventKey,
            {
              qm: "Qualification",
              ef: "Playoff",
              qf: "Playoff",
              sf: "Playoff",
              f: "Playoff",
            }[body.message_data.match.comp_level],
            body.message_data.match.match_number,
            "Blue",
            1
          )
        );
        boundStmts.push(
          updateTeamMatchEntry.bind(
            body.message_data.match.score_breakdown.blue.autoLineRobot2 ===
              "Yes",
            body.message_data.match.score_breakdown.blue.endGameRobot2 ===
              "Parked",
            body.message_data.match.score_breakdown.blue.endGameRobot2 ===
              "ShallowCage",
            body.message_data.match.score_breakdown.blue.endGameRobot2 ===
              "DeepCage",
            body.message_data.match.eventKey,
            {
              qm: "Qualification",
              ef: "Playoff",
              qf: "Playoff",
              sf: "Playoff",
              f: "Playoff",
            }[body.message_data.match.comp_level],
            body.message_data.match.match_number,
            "Blue",
            2
          )
        );
        boundStmts.push(
          updateTeamMatchEntry.bind(
            body.message_data.match.score_breakdown.blue.autoLineRobot3 ===
              "Yes",
            body.message_data.match.score_breakdown.blue.endGameRobot3 ===
              "Parked",
            body.message_data.match.score_breakdown.blue.endGameRobot3 ===
              "ShallowCage",
            body.message_data.match.score_breakdown.blue.endGameRobot3 ===
              "DeepCage",
            body.message_data.match.eventKey,
            {
              qm: "Qualification",
              ef: "Playoff",
              qf: "Playoff",
              sf: "Playoff",
              f: "Playoff",
            }[body.message_data.match.comp_level],
            body.message_data.match.match_number,
            "Blue",
            3
          )
        );
        boundStmts.push(
          updateHumanPlayerEntry.bind(
            body.message_data.match.score_breakdown.blue.wallAlgaeCount,
            body.message_data.match.eventKey,
            {
              qm: "Qualification",
              ef: "Playoff",
              qf: "Playoff",
              sf: "Playoff",
              f: "Playoff",
            }[body.message_data.match.comp_level],
            body.message_data.match.match_number,
            "Red"
          )
        );
        boundStmts.push(
          updateHumanPlayerEntry.bind(
            body.message_data.match.score_breakdown.red.wallAlgaeCount,
            body.message_data.match.eventKey,
            {
              qm: "Qualification",
              ef: "Playoff",
              qf: "Playoff",
              sf: "Playoff",
              f: "Playoff",
            }[body.message_data.match.comp_level],
            body.message_data.match.match_number,
            "Blue"
          )
        );
        opts.env.DB.batch(boundStmts);
        return new Response("Score breakdown received.");
      } else {
        //TODO: use another status code?
        return new Response("No score breakdown.");
      }
    }
    default: {
      return new Response(
        `The server is unable to handle the message type: ${
          (
            body as {
              message_type: string;
              message_data: unknown;
            }
          ).message_type
        }`,
        {
          status: 501,
          statusText: "Not Implemented",
        }
      );
    }
  }
  console.log(body.message_type);
};
