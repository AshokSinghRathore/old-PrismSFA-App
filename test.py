import cv2 

cap = cv2.VideoCapture(0);

while True:
    ref,frame=cap.read();
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break
    cv2.imshow("video",frame)