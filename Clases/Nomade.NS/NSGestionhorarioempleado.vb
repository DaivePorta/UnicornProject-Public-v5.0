Public Class NSGestionhorarioempleado
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarHorarioEmpleado(ByVal p_PEBHOEC_CODE As String, ByVal p_PEBHOEC_EMPL_PIDM As Integer, ByVal p_PEBHOEC_CTLG_CODE As String, ByVal p_PEBHOEC_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_HORARIO_EMPLEADOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBHOEC_CODE", p_PEBHOEC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBHOEC_EMPL_PIDM", p_PEBHOEC_EMPL_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBHOEC_ESTADO_IND", p_PEBHOEC_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBHOEC_CTLG_CODE", p_PEBHOEC_CTLG_CODE, ParameterDirection.Input, 253))


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

    Public Function CambiarEstadoHorarioEmpleado(ByVal p_codigo As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CAMBIAR_ESTADO_HORARIO_EMPLEADOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_ESTADO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearHorario(ByVal p_EMPL_PIDM As Integer, ByVal p_FECHA_INICIO As String,
                                  ByVal p_FECHA_LIMITE As String, ByVal p_INC_FERIADOS_IND As String,
                                  ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String, p_ZOHO_CODE As String, p_CTLG_CODE As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_HORARIO_EMPLEADO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EMPL_PIDM", p_EMPL_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_LIMITE", DevuelveNulo(p_FECHA_LIMITE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_INC_FERIADOS_IND", p_INC_FERIADOS_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ZOHO_CODE", p_ZOHO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarHorario(ByVal p_CODE As String, ByVal p_EMPL_PIDM As Integer, ByVal p_FECHA_INICIO As String,
                                    ByVal p_FECHA_LIMITE As String, ByVal p_INC_FERIADOS_IND As String, ByVal p_ESTADO_IND As String,
                                    ByVal p_USUA_ID As String, p_ZOHO_CODE As String, p_CTLG_CODE As String) As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_ACTUALIZAR_HORARIO_EMPLEADO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EMPL_PIDM", p_EMPL_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_LIMITE", DevuelveNulo(p_FECHA_LIMITE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_INC_FERIADOS_IND", p_INC_FERIADOS_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ZOHO_CODE", p_ZOHO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarHorarioEmpleadoDetalle(ByVal p_HOEC_CODE As String, ByVal p_SEQ As Integer, ByVal p_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_HORARIO_EMPLEADOS_DETALLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_HOEC_CODE", p_HOEC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SEQ", p_SEQ, ParameterDirection.Input, 253))
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

    Public Function CrearHorarioDetalle(ByVal p_HOEC_CODE As String, ByVal p_HORA_INICIO As String, ByVal p_HORA_FIN As String, ByVal p_LUNES_IND As String,
                                        ByVal p_MARTES_IND As String, ByVal p_MIERCOLES_IND As String, ByVal p_JUEVES_IND As String, ByVal p_VIERNES_IND As String,
                                        ByVal p_SABADO_IND As String, ByVal p_DOMINGO_IND As String, ByVal p_ESTADO_IND As String,
                                        ByVal p_USUA_ID As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_HORARIO_EMPLEADO_DETALLE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_HOEC_CODE", p_HOEC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HORA_INICIO", p_HORA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HORA_FIN", p_HORA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LUNES_IND", p_LUNES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARTES_IND", p_MARTES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MIERCOLES_IND", p_MIERCOLES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_JUEVES_IND", p_JUEVES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VIERNES_IND", p_VIERNES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SABADO_IND", p_SABADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOMINGO_IND", p_DOMINGO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function EliminarHorarioDetalle(ByVal p_CODE As String, ByVal p_SEQ As String) As String

        Try
            Dim msg As String
            If Not p_SEQ = "" And Not p_CODE = "" Then
                Dim cmd As IDbCommand
                Dim cmd1 As IDbCommand

                cmd = cn.GetNewCommand("PCS_ELIMINAR_HORARIO_EMPLEADO_DETALLE", CommandType.StoredProcedure)

                cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@p_SEQ", p_SEQ, ParameterDirection.Input, 253))
                cmd1 = cn.Ejecuta_parms(cmd)
                msg = "OK"
            Else
                msg = "SE"
            End If

           

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Break_Empleado_Detalle(ByVal p_HOEC_CODE As String, ByVal p_SEQ As Integer, ByVal p_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_BREAK_EMPLEADOS_DETALLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_HOEC_CODE", p_HOEC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SEQ", p_SEQ, ParameterDirection.Input, 253))
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

    Public Function Eliminar_Break_Detalle(ByVal p_CODE As String) As String

        Try
            Dim msg As String
            If Not p_CODE = "" Then
                Dim cmd As IDbCommand
                Dim cmd1 As IDbCommand

                cmd = cn.GetNewCommand("PCS_ELIMINAR_BREAK_EMPLEADO_DETALLE", CommandType.StoredProcedure)

                cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))

                cmd1 = cn.Ejecuta_parms(cmd)
                msg = "OK"
            Else
                msg = "SE"
            End If



            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_Break_Detalle(ByVal p_HOEC_CODE As String, ByVal p_HORA_INICIO As String, ByVal p_HORA_FIN As String, ByVal p_LUNES_IND As String,
                                    ByVal p_MARTES_IND As String, ByVal p_MIERCOLES_IND As String, ByVal p_JUEVES_IND As String, ByVal p_VIERNES_IND As String,
                                    ByVal p_SABADO_IND As String, ByVal p_DOMINGO_IND As String, ByVal p_ESTADO_IND As String,
                                    ByVal p_USUA_ID As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCS_CREAR_BREAK_EMPLEADO_DETALLE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_HOEC_CODE", p_HOEC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HORA_INICIO", p_HORA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HORA_FIN", p_HORA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LUNES_IND", p_LUNES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARTES_IND", p_MARTES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MIERCOLES_IND", p_MIERCOLES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_JUEVES_IND", p_JUEVES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VIERNES_IND", p_VIERNES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SABADO_IND", p_SABADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOMINGO_IND", p_DOMINGO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Function DevuelveNulo(ByVal p_Value As Object) As Object

        If Trim(p_Value) = String.Empty Then
            Return DBNull.Value
        Else
            Return p_Value
        End If

    End Function

End Class
