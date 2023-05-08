Public Class NSJustificacion
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
#Region "Justificación"
    Public Function Crear_Justificacion(p_CTLG_CODE As String,
                                         p_SCSL_CODE As String,
                                         p_PIDM As String,
                                         p_TIPO_FALTA As String,
                                         p_DIA_INICIO As String,
                                         p_DIA_FIN As String,
                                         p_DESDE_HORA As String,
                                         p_HASTA_HORA As String,
                                         p_MOTIVO As String,
                                         p_EST_IND As String,
                                         p_MIN_REFRIGERIO As String,
                                         p_IND_COMPLETADO As String,
                                         p_NUM_DIAS_LABORADOS As String,
                                         p_TIPO_JUST As String,
                                         p_TIPO_MOTIVO As String,
                                         p_USUA_ID As String,
                                         Optional p_IND_MANUAL As String = "M") As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PRH_INSERTAR_FAL_TAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE_HORA", p_DESDE_HORA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIA_FIN", IIf(p_DIA_FIN = Nothing, Nothing, p_DIA_FIN), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIA_INICIO", IIf(p_DIA_INICIO = Nothing, Nothing, p_DIA_INICIO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EST_IND", p_EST_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA_HORA", p_HASTA_HORA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MIN_REFRIGERIO", p_MIN_REFRIGERIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPLETADO", p_IND_COMPLETADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO", p_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DIAS_LABORADOS", p_NUM_DIAS_LABORADOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_FALTA", p_TIPO_FALTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_JUST", p_TIPO_JUST, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_MOTIVO", p_TIPO_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_MANUAL", p_IND_MANUAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHFATAR_CODE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RHFATAR_CODE").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Actualizar_Justificacion(ByVal p_CODE As String, ByVal p_DESDE_HORA As String,
                                       ByVal p_DIA_FIN As String, ByVal p_DIA_INICIO As String, ByVal p_EST_IND As String,
                                       ByVal p_HASTA_HORA As String, ByVal p_MIN_REFRIGERIO As String,
                                       ByVal p_IND_COMPLETADO As String, ByVal p_MOTIVO As String,
                                       ByVal p_NUM_DIAS_LAB As String, ByVal p_TIPO_FALTA As String,
                                        ByVal p_TIPO_JUST As String, ByVal p_TIPO_MOTIVO As String, ByVal p_USUA_ID As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PRH_MODIFICAR_FAL_TAR", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE_HORA", p_DESDE_HORA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIA_FIN", IIf(p_DIA_FIN = Nothing, Nothing, p_DIA_FIN), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIA_INICIO", IIf(p_DIA_INICIO = Nothing, Nothing, p_DIA_INICIO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EST_IND", p_EST_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA_HORA", p_HASTA_HORA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MIN_REFRIGERIO", p_MIN_REFRIGERIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPLETADO", p_IND_COMPLETADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO", p_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DIAS_LAB", p_NUM_DIAS_LAB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_FALTA", p_TIPO_FALTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_JUST", p_TIPO_JUST, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_MOTIVO", p_TIPO_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value
            'msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Listar_Justificacion(ByVal p_RHFATAR_CODE As String, ByVal p_RHFATAR_CTLG_CODE As String,
                                          ByVal p_RHFATAR_FTVSCSL_CODE As String, ByVal p_RHFATAR_ANHO As String,
                                          p_RHFATAR_MES As String, Optional p_ESTADO_IND As String = Nothing,
                                          Optional p_TODOS_IND As String = "S", Optional p_TIPO_FALTA As String = Nothing) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PRH_LISTAR_FAL_TAR", CommandType.StoredProcedure)
            If p_RHFATAR_CODE = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_RHFATAR_CODE", Nothing, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_RHFATAR_CODE", p_RHFATAR_CODE, ParameterDirection.Input, 253))
            End If


            cmd.Parameters.Add(cn.GetNewParameter("@p_RHFATAR_CTLG_CODE", p_RHFATAR_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHFATAR_FTVSCSL_CODE", p_RHFATAR_FTVSCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHFATAR_ANHO", p_RHFATAR_ANHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHFATAR_MES", p_RHFATAR_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TODOS_IND", p_TODOS_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_FALTA", p_TIPO_FALTA, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
#End Region
#Region "Imágenes"
    Public Function Crear_Imagen(ByVal p_RHIMFTR_CODE As String, ByVal p_RHIMFTR_RHFATAR_CODE As String,
                                   ByVal p_RHIMFTR_RUTA As String, ByVal p_RHIMFTR_DESCRIPCION As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand



            cmd = cn.GetNewCommand("PRH_INSERTAR_RHIMFTR", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHIMFTR_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHIMFTR_RHFATAR_CODE", p_RHIMFTR_RHFATAR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHIMFTR_RUTA", p_RHIMFTR_RUTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHIMFTR_DESCRIPCION", p_RHIMFTR_DESCRIPCION, ParameterDirection.Input, 253))

            'cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RHIMFTR_CODE").Value
            'msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Actualizar_Imagen(ByVal p_RHIMFTR_CODE As String, ByVal p_RHIMFTR_RUTA As String,
                                       ByVal p_RHIMFTR_DESCRIPCION As String, ByVal p_SALIDA As String,
                                       ByVal p_ELIMINAR As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand



            cmd = cn.GetNewCommand("PRH_MODIFICAR_RHIMFTR", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHIMFTR_CODE", p_RHIMFTR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHIMFTR_RUTA", p_RHIMFTR_RUTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHIMFTR_DESCRIPCION", p_RHIMFTR_DESCRIPCION, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ELIMINAR", p_ELIMINAR, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value
            'msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Listar_Imagen(ByVal p_RHIMFTR_RHFATAR_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PRH_LISTAR_RHIMFTR", CommandType.StoredProcedure)


            cmd.Parameters.Add(cn.GetNewParameter("@p_RHIMFTR_RHFATAR_CODE", p_RHIMFTR_RHFATAR_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function LISTAR_CANTIDAD_DIAS_FERIADOS(ByVal p_FECHA_INI, ByVal p_FECHA_FIN, ByVal p_CTLG_CODE, ByVal p_SCSL_CODE, ByVal p_TIPO_FER) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_DEVULVE_CANTIDAD_DIAS_FERIADOS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI", p_FECHA_INI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_FER", p_TIPO_FER, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


#End Region



    Public Function Listar_tipo_motivo_just(ByVal p_CODE As String, ByVal p_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_TIPO_MOTIVO_JUSTIFICACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Actualizar_Justificacion_bloque(p_DETALLE As String, ByVal p_MOTIVO As String,
                                       ByVal p_TIPO_JUST As String, ByVal p_TIPO_MOTIVO As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_ACTUALIZA_PERMISO_FALTA_BLOQUE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO", p_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_JUST", p_TIPO_JUST, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_MOTIVO", p_TIPO_MOTIVO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value
            'msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
